<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;
use Str;

class Proyecto extends Model
{
    protected $table = 'proyectos'; 

    protected $fillable = ['id','cliente_id','peso_lbs','item','cantidad','status','cotizado','dias_habiles','pagado_status','descripcion','notas','titulo','work_order','plan_corte','heat_number','orden_compra','numero_factura','tipo_cambio','validez','deleted_at','created_at','updated_at','fecha_entrega','numero_parte','numero_parte_cliente','pintura_id','hrs_labor'];


    public function Cliente()
    {
        return $this->hasOne('App\Cliente','id','cliente_id');
    }

    public function Productos(){
        return $this->belongsToMany('App\Producto', 'proyecto_producto','proyecto_id', 'producto_id')
                    ->withPivot('id','cantidad','numero_parte_cliente','work_order','item','cantidad','heat_number','notas','hrs_labor','pintura_id','proceso_id','fecha_entrega','precio_pesos','precio_dlls','numero_parte','codigo_barras_cliente')
                    ->using('App\ProyectoProducto')
                    ->as('ProyectoProducto')
                    ->withTimestamps();
    }

    public function Procesos(){
        return $this->belongsToMany('App\Proceso', 'proyectos_procesos')
                    ->withPivot('id','porcentaje','orden')
                    ->withTimestamps();
    }

    public function Documentos(){
	    return $this->belongsToMany('App\Documento', 'proyecto_documento','proyecto_id', 'documento_id')->withTimestamps();
    }
    
    /** Funcion para eliminar un proyecto y desvincular sus documentos correctamente */
	public function deleteDetach(){
		/**Detach */
		$this->deleteAllDocumentos();
		/**Delete producto*/
        $this->delete();
        
    }
    
    /**Funcion para eliminar todos los documentos de un producto
	 * 
	 * Se necesita haber cargado los documentos anteriormente
	 * 
	 */
	public function deleteAllDocumentos(){
		foreach ($this->documentos as $key => $documento) {
			$path = '/public/'.$documento->url."/".$documento->nombre_sistema;
			if (Storage::disk('public')->exists($documento->url.'/'.$documento->nombre_sistema)) {
				$this->Documentos()->detach($documento->id);
				$documento->delete();
				Storage::delete($path);
			}
		}
	}

    public function crearProcesos(){
        $procesos = Proceso::where('activo',1)->get();
        foreach ($procesos as $key => $proceso) {
            $this->Procesos()   ->attach($proceso->id, [   
                                    'porcentaje' => $proceso->porcentaje,
                                    'orden' => $proceso->orden,
                                    'es_ultimo' => $proceso->es_ultimo,
                                    'es_primero' => $proceso->es_primero,
                                    'es_estatico' => $proceso->es_estatico,    
                                ]);
        }
    }

    public function insertProductos($productos,$user_id){
        /**Obtenemos ids de los productos */    
        $productos = collect($productos);
        //Obtenmenos los ids para eliminarlos
        $productos_id = $productos->map(function ($producto) {
                            return collect($producto)->only(['id'])->all();
                         });
        /*Se eliminan los productos que no hayan venido en el request*/
        foreach (ProyectoProducto::where('proyecto_id','=',$this->id)->whereNotIn('producto_id',$productos_id)->get() as $id => $proyectoProducto) {
            $this->Productos()->detach($proyectoProducto->producto_id);
        }

        /*obtener proceso numero 1*/        
        $proceso = $this->procesos->where('es_primero',1)->first();
        $proyectosProductos = ProyectoProducto::where('proyecto_id',$this->id)->get();
        
        foreach ($productos as $producto) {
            
            /**Bandera para saber si exste un proyectoProducto */
            $existe = 0;
            if(isset($producto['proyecto_producto']['id'])){
                foreach ($proyectosProductos as $proyectoProducto){
                    /*Si lo encontramos lo actualizamos*/
    
                    if($producto['proyecto_producto']['id'] == $proyectoProducto->id){
                        $proyectoProducto->cantidad = $producto['proyecto_producto']['cantidad'];
                        $proyectoProducto->item = $producto['proyecto_producto']['item'];
                        $proyectoProducto->work_order = $producto['proyecto_producto']['work_order'];
                        $proyectoProducto->heat_number = $producto['proyecto_producto']['heat_number'];
                        $proyectoProducto->precio_pesos = $producto['proyecto_producto']['precio_pesos'];
                        $proyectoProducto->precio_dlls = $producto['proyecto_producto']['precio_dlls'];
                        $proyectoProducto->update();
                        $existe = 1;
                    }
                }
            }else{
                /*Si no lo encontramos lo agregamos y le damos los datos que vienen en el request*/
                $this   ->Productos()
                        ->attach($producto['id'],
                        [   'cantidad' => $producto['proyecto_producto']['cantidad'],
                            'item' => $producto['proyecto_producto']['item'],
                            'work_order' => $producto['proyecto_producto']['work_order'],
                            'heat_number' => $producto['proyecto_producto']['heat_number'],
                            'precio_pesos' => $producto['proyecto_producto']['precio_pesos'],
                            'precio_dlls' => $producto['proyecto_producto']['precio_dlls'],
                            'fecha_entrega' => request()->fecha_entrega,
                        ]);

                $this->attachProyectoProductoProceso($user_id,$producto['id']);
            }
        }

        $proyectosProductos = ProyectoProducto::where('proyecto_id',$this->id)->get();
        /**Si no tiene numero parte de actualiza */
        foreach ($proyectosProductos as $proyectoProducto){
            if($proyectoProducto->numero_parte == null){
                $proyectoProducto->numero_parte = 'OR-'.$proyectoProducto->id;
                $proyectoProducto->update();
            }
        }
    }

    public function attachProyectoProductoProceso($user_id,$producto_id){
        /**Esta fincion busca el ProyectoProducto por Id Producto y Proyecto */
        $proyectoProductoAux = $this->getProyectoProductoById($producto_id);
        $proyectoProceso = $this->getFirstProceso();
        $proyectoProductoAux->ProyectoProcesoProducto()
                            ->attach($proyectoProductoAux->id,[   
                                'proyecto_proceso_id' => $proyectoProceso->id,
                                'user_id' => $user_id
                            ]);
        return $proyectoProductoAux;
    }

    public function getProyectoProductoById($id){
        return ProyectoProducto::   with('ProyectoProcesoProducto')   
                                    ->where([
                                        ['proyecto_id',$this->id],
                                        ['producto_id',$id]
                                    ])
                                    ->first();
    }

    public function getFirstProceso(){
        return  ProyectoProceso::   whereHas('Proceso', function ($query) {
                                        return $query->where('es_primero', '=', 1);
                                    })
                                    ->where('proyecto_id',$this->id)
                                    ->first();
    }


    public function loadTotalHrsLabor(){
        $this['totalHrsLabor'] = $this->getTotalHrsLabor();
    }

    public function getTotalHrsLabor(){
        $productos = $this->productos;
        $totalHrsLabor = 0;
        foreach ($productos as $key => $producto) {
            $totalHrsLabor += $producto->getHrsLabor();
        }
        return number_format((float)$totalHrsLabor, 2, '.', '');
    }

    public function loadProgreso(){
        $this['progreso'] = $this->getProgreso();
    }

    public function getProgreso(){
        if($this->productos->count() == 0)
            return 0;

        $sumaByProducto = 0;
        $sumaTotal = 0;
        $procesos = $this->procesos->where('es_estatico','!=',1)->sortBy('orden');
        
        foreach ($this->productos as $key => $producto) {

            $lastProceso = $producto->ProyectoProducto->getLastProyectoProceso();
            //Si esta apenas comezado sera 0
            if($lastProceso->es_primero == 1){
                $sumaByProducto = 0;
                continue;
            }//si esta terminado sera 100 automaticamente
            elseif($lastProceso->es_ultimo == 1){
                $sumaByProducto = 100;
            }else{//si no es ninguno de los anteriores lo calculamos
                foreach ($procesos as $key => $proceso) {
                    if($proceso->pivot->id == $lastProceso->id){
                        $sumaByProducto += ($proceso->pivot->porcentaje/2);
                        break;
                    }else{
                        $sumaByProducto += $proceso->pivot->porcentaje;
                    }
                }    
            }
            $sumaTotal += $sumaByProducto;
            $sumaByProducto = 0;
        }

        return number_format((float)($sumaTotal/$this->productos->count()), 2, '.', '');
        
    }

    

    
    


// public function updateProductosByRequest($user_id){
    //     //cargar Request como collection
    //     $request = collect(request());

    //     //contamos la cantidad para poder hacer el loop
    //     $cant_prod = count(collect($request)->get('prod_id'));

    //     /*obtener proceso n1*/        
    //     $proceso = $this->procesos->where('es_primero',1)->first();
        
    //     /*Se eliminan los productos que no hayan venido en el request*/
    //     $this->Productos()->where('id','!=',$request->get('prod_id'))->detach();

    //     /*loop por id de producto que viene en el request*/
    //     for ($i=0; $i < $cant_prod; $i++) {
    //         if(isset($request->get('prod_id')[$i])){
    //             $existe = false;
    //             /*Buscamos en cada producto del proyecto*/
    //             foreach ($this->productos as $proyectoProducto){
    //                 /*Se lo encontramos lo actualizamos*/
    //                 if( $request->get('prod_id')[$i] == $proyectoProducto->id){

    //                     $proyectoProducto->pivot->cantidad = $request->get('prod_cant')[$i];
    //                     $proyectoProducto->pivot->item = $request->get('prod_item')[$i];
    //                     $proyectoProducto->pivot->work_order = $request->get('prod_work_order')[$i];
    //                     $proyectoProducto->pivot->heat_number = $request->get('prod_heat_number')[$i];
    //                     $proyectoProducto->pivot->update();
    //                     $existe = true;
    //                 }
    //             }
    //             /*Si no lo encontramos lo agregamos y le damos los datos que vienen en el request*/
    //             if(!$existe){
    //                 $this   ->Productos()
    //                         ->attach($request->get('prod_id')[$i],
    //                         [   'cantidad' => $request->get('prod_cant')[$i],
    //                             'item' => $request->get('prod_item')[$i],
    //                             'work_order' => $request->get('prod_work_order')[$i],
    //                             'heat_number' => $request->get('prod_heat_number')[$i]]);

    //                 $this->attachProyectoProductoProceso($user_id,$request->get('prod_id')[$i]);
    //             }
    //         }
    //     }
    // }
    
}
