<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ProyectoProducto;
use App\ProyectoProceso;
use App\ProyectoProcesoProducto;
use App\Cliente;
use App\Proceso;
use App\Documento;
use Carbon\Carbon;
use Auth;
use DB;
use App\Http\Resources\ProyectoProductoResource;
use Illuminate\Support\Arr;

class proyectosProductosController extends Controller
{
	/************************************ Nuevos metodos para usar Resource*/
	/** Este metodo se utiliza para traer las ordenes que estan en estatus terminado
	 * Utilizado en: Embarques
	 * 
	 */
	public function OrdenesTerminadas(Request $request)
    {
		//$params = $request->all();
		//return $params;
        return ProyectoProductoResource::collection(ProyectoProducto::loadOrdenesAbiertasTerminadas($params['cliente_id']));
	}

	/** Funcion para guardar archivos */
	public function storeDocumento(Request $request)
    {
		DB::transaction(function () use ($request){
			if(request()->file('file')){
				$proyectoProducto = ProyectoProducto::find(request()->get('proyecto_producto_id'));
				$proyectoProducto->Documentos()->attach(Documento::store(request()->file('file'),'uploads/proyectos/'.$proyectoProducto->numero_parte.'/documentos'));
			}
		});
		return (ProyectoProducto::where('id',request()->get('proyecto_producto_id'))->with(['Documentos'])->first());
    }

    /** Funcion para eliminar archivos */
	public function deleteDocumento(){
		DB::transaction(function () {
			(ProyectoProducto::find(request()->get('proyecto_producto_id')))->Documentos()->detach(request()->get('documento_id'));
			(Documento::find(request()->get('documento_id')))->deleteStorage();
		});

		return (ProyectoProducto::where('id',request()->get('proyecto_producto_id'))->with(['Documentos'])->first());
	}
    
	/** Funcion para guardar archivos */
	public function downloadDocumento($documento_id){
		return (Documento::find($documento_id))->download();
	}

	

	 /** Funcion para obtener todos los materiales */
	 public function proyectosProductos(){
        return ProyectoProducto::loadOrdenesAbiertasWithAll();
	}

	/*Funcion para insertar o Actualizar un proyecto*/
	public function insert(){
		request()->merge(['fecha_entrega' => Carbon::parse(request()->fecha_entrega)]);
        request()->merge(['fecha_promesa' => Carbon::parse(request()->fecha_promesa)]);
		//return request();
        $proyectoProducto = new ProyectoProducto;
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $proyectoProducto = $proyectoProducto ->fill(request()->all())
                                            ->updateOrCreate(['id' => request()->get('id')],$proyectoProducto->toArray());
    }

    /* Funcion para eliminar con id */
    public function delete(){
        $proyectoProducto = ProyectoProducto::find(request()->get('id'))->delete();
	}
	/** Funcion para obtener los procesos de los proyectos y el ultimo proceso  */
	public function getProcesosByProducto(){
		$data['procesos'] = ProyectoProceso::
								orderBy('orden','ASC')
								->where([	['proyecto_id',request()->get('proyecto_id')],
										['es_estatico',0]])
								
								->with('Proceso')->get();
		
		$data['procesoPrimero'] = ProyectoProceso::where([	['proyecto_id',request()->get('proyecto_id')],
															['es_primero',1]])
														->with('Proceso')->first();

		$data['procesoUltimo'] = ProyectoProceso::where([	['proyecto_id',request()->get('proyecto_id')],
														['es_ultimo',1]])
													->with('Proceso')->first();
        
        $proyectoProducto = ProyectoProducto::  with('getProyectoProcesoProducto.ProyectoProceso.Proceso')
                                                ->where('id',request()->get('id'))
                                                ->first();

        $data['lastProceso'] = $proyectoProducto->getLastProceso();
        return $data;
	}
	
	/**Funcion para guardar el nuevo porceso asignado y actualizar la fecha del proceso anterior */
    public function saveProceso(){
		/*Se busca el PPP de el producto y el proceso*/
		$proyectoProcesoProductoActual = ProyectoProcesoProducto::orderBy('created_at','DESC')
																->where([
																	['proyecto_proceso_id',request()->get('proceso_actual')],
																	['proyecto_producto_id',request()->get('id')]
																])	
    															->first();
    	/*Se actualiza  el proceso anterior*/
		$proyectoProcesoProductoActual['terminado_el'] = Carbon::now()->toDateTimeString();
		$proyectoProcesoProductoActual['notas'] = request()->get('notas');
		$proyectoProcesoProductoActual->update();
    	/*Se preparan los datos del From para introducirse a la BD*/
    	$proyectoProcesoProductoNuevo = [
    							'proyecto_proceso_id' => request()->get('proceso_nuevo'),
    							'proyecto_producto_id' => request()->get('id'),
								'user_id' => Auth::id(),
								'iniciado_el' => Carbon::now()->toDateTimeString(),
								'notas' => request()->get('notas')
    						];
    	/*Se hace el insert*/
    	ProyectoProcesoProducto::create($proyectoProcesoProductoNuevo);
	}

	/**Funcion para guardar el dato del codigo de barras del cliente*/
    public function saveCodigoBarras(){
		/*Se busca el PPP de el producto y el proceso*/
		$proyectoProducto = ProyectoProducto::orderBy('created_at','DESC')->where('id',request()->get('id'))->first();
		$proyectoProducto->codigo_barras_cliente = request()->get('codigo_barras_cliente');
		$proyectoProducto->update();
	}

	/** Funcion para obtener todos los procesos de un porducto con sus fechas */
	public function getHistorialProcesos(){
		return 	(ProyectoProcesoProducto::orderBy('created_at','DESC')->with('ProyectoProceso.Proceso','User')->where('proyecto_producto_id',request()->get('id'))->get());
	}

    
}
