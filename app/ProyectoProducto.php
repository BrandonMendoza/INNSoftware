<?php

namespace App;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Carbon\Carbon;

class ProyectoProducto extends Pivot
{
	protected $table = 'proyecto_producto'; 
    protected $primaryKey = "id";
    protected $attributes = array(
        'precio_pesos' => 0,
        'precio_dlls' => 0,
     );
     public $incrementing = true;
    protected $fillable = 
    [   
        'id',
        'proyecto_id',
        'producto_id',
        'proceso_id',
        'work_order',
        'item',
        'cantidad',
        'heat_number',
        'notas','hrs_labor',
        'pintura_id',
        'created_at',
        'updated_at',
        'proceso_id',
        'numero_parte_cliente',
        'fecha_entrega',
        'precio_pesos',
        'precio_dlls',
        'numero_parte',//Este dato se utiliza para los codigos de barra locales
        'codigo_barras_cliente',//este dato se utiliza para los codigos de barra de cliente
        'embarcado',//Dato para saber cuando una orden ya ha sido agregada a un embarque
        'fecha_promesa',//Dato que solo veran los usuarios que estan relacionados a produccion
        'padre_id',//Dato para agrupar ordenes abiertas
        'plan_corte',
        'embarcado_el'

    ];
    protected $dates = ['fecha_entrega'];

    protected $casts = [
        'id' => 'integer',
        'proyecto_id' => 'integer',
        'producto_id' => 'integer',
        'proceso_id' => 'integer',
        'pintura_id' => 'integer',
        'proceso_id' => 'integer',
        'precio_pesos' => 'float',
        'precio_dlls' => 'float',
        'embarcado' => 'integer'
    ];

	public function Producto()
    {
        return $this->hasOne('App\Producto','id','producto_id');
    }

    public function Proyecto()
    {
        return $this->hasOne('App\Proyecto','id','proyecto_id');
    }

    public function Documentos(){
	    return $this->belongsToMany('App\Documento', 'proyecto_producto_documento','proyecto_producto_id', 'documento_id')->withTimestamps();
    }

    public function ProyectoProductoComentario(){
	    return $this->hasMany('App\ProyectoProductoComentario','proyecto_producto_id','id');
    }

    public function ProyectoProcesoProducto(){
        return $this->hasMany('App\ProyectoProcesoProducto','proyecto_producto_id','id')
                //->withPivot('id','proyecto_proceso_id','proyecto_producto_id','user_id')
                //->using('App\ProyectoProcesoProducto')
                ->orderBy('proyecto_proceso_proyecto_producto.created_at','DESC');
        //return $this->belongsToMany('App\ProyectoProceso','proyecto_proceso_proyecto_producto','proyecto_producto_id')
         //           ->orderBy('proyecto_proceso_proyecto_producto.created_at','DESC');
                    
                    // ->using('App\ProyectoProcesoProducto')
                    //->as('ProyectoProcesoProducto')
                    
                    //->withTimestamps();
    }

    
    public function ProyectoProcesoProductoBelongs(){
        return $this->belongsToMany('App\ProyectoProceso','proyecto_proceso_proyecto_producto','proyecto_producto_id')
                    ->withPivot('id','proyecto_proceso_id','proyecto_producto_id','user_id')
                     ->using('App\ProyectoProcesoProducto')
                    ->as('ProyectoProcesoProducto')
                    ->orderBy('proyecto_proceso_proyecto_producto.created_at','DESC')
                    ->withTimestamps();
    } 
     

    public function ProyectoProcesoProductoUltimo(){
        return $this->getProyectoProcesoProducto()
                        ->with('ProyectoProceso.Proceso')
                        ->orderBy('created_at','DESC')
                        ->first();
    }

    public static function loadOrdenesAbiertasWithAll(){
        $ordenesAbiertas = ProyectoProducto::
                                orderBy('fecha_entrega','DESC')
                                ->with([ 'Producto','Proyecto','Proyecto.Cliente'])
                                ->get();

        foreach ($ordenesAbiertas as $key => $ordenAbierta) {
            $ordenAbierta->loadProceso();
        }
        return $ordenesAbiertas;
    }

    public static function getDocumentosFromOrden($proyecto_producto_id){
        return ProyectoProducto::orderBy('fecha_entrega','DESC')
                                    ->where('id',$proyecto_producto_id)
                                    ->with(['Documentos'])
                                    ->get();
    }

    public static function getOrdenesAbiertasList($mostrarTerminados){
        //$date = Carbon::today()->addYears(2);
        $ordenes = ProyectoProducto::orderBy('fecha_promesa','ASC')
                                    ->with(['Producto',
                                            'Proyecto',
                                            'Proyecto.Cliente',
                                            //'ProyectoProcesoProducto.ProyectoProceso.Proceso',
                                            'ProyectoProductoComentario'])
                                    //->whereDate('created_at','<=',$date)
                                    ->get();

        foreach ($ordenes as $key => $ordenAbierta) {
            $ordenAbierta->loadProceso();
        }

        if($mostrarTerminados == 0){
            $ordenes = $ordenes->where('Proceso.ProyectoProceso.es_ultimo',0);
        }        

        return $ordenes;            
    }

    public static function getOrdenesTerminadasSinEmbarcarList($mostrarTerminados){
        //$date = Carbon::today()->addYears(2);
        $ordenes = ProyectoProducto::orderBy('fecha_promesa','ASC')
                                    ->with(['Producto',
                                            'Proyecto',
                                            'Proyecto.Cliente',
                                            //'ProyectoProcesoProducto.ProyectoProceso.Proceso',
                                            'ProyectoProductoComentario'])
                                    ->where("embarcado",0)
                                    //->whereDate('created_at','<=',$date)
                                    ->get();

        foreach ($ordenes as $key => $ordenAbierta) {
            $ordenAbierta->loadProceso();
        }

        
        $ordenes = $ordenes->where('Proceso.ProyectoProceso.es_ultimo',1);

        return $ordenes;            
    }

    public static function getOrdenesTerminadasSinEmbarcar($cliente_id = 0){
        $ordenes = ProyectoProducto::
                                where('embarcado',0)
                                ->orderBy('fecha_promesa','ASC')
                                ->with([ 'Producto','Proyecto','Proyecto.Cliente'])
                                ->get();
                                
        foreach ($ordenes as $key => $orden) {
            $orden->loadProceso();
        }
        
        if ($cliente_id != 0) {
            $ordenes = $ordenes->where('Proyecto.cliente_id', $cliente_id);
        }

        return $ordenes;
    }

    public static function getOrdenesAbiertasByCliente($cliente_id = 0){
        $ordenes = ProyectoProducto::orderBy('fecha_promesa','ASC')
                                    ->with(['Producto',
                                            'Proyecto',
                                            'Proyecto.Cliente',
                                            'ProyectoProcesoProducto.ProyectoProceso.Proceso',
                                            'ProyectoProductoComentario'])
                                    ->get();
        
        if ($cliente_id != 0) {
            $ordenes = $ordenes->where('Proyecto.cliente_id', $cliente_id);
        }
        return $ordenes;
    }
    

    public function loadProceso(){
        $this['Proceso'] = $this->getLastProceso();
    }

    public function loadProgreso(){
        $total = 0;
        $procesosProducto = $this->getProyectoProcesoProducto;
        foreach ($procesosProducto as $key => $procesoProducto) {
            $total += $procesoProducto->proyectoProceso->porcentaje;
        }
        $total -= (float)$this->getLastProceso()->porcentaje/2;
        return $total;
    }    
    

    public function getLastProceso()
    {
        return $this->getProyectoProcesoProducto()
                    ->with('ProyectoProceso.Proceso')
                    ->orderBy('created_at','DESC')
                    ->first();
    }

    public function getLastproyectoProceso()
    {
        return ($this->getProyectoProcesoProducto()
                    ->with('ProyectoProceso.Proceso')
                    ->orderBy('created_at','DESC')
                    ->first())
                    ->proyectoProceso;
    }

    public function getProyectoProcesoProducto(){
        return $this->hasMany('App\ProyectoProcesoProducto','proyecto_producto_id','id');
    }
}
