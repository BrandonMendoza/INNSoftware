<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProyectoProductoResource;
use Illuminate\Http\Request;
use App\ProyectoProducto;
use App\ProyectoProceso;
use App\ProyectoProcesoProducto;
use App\Proyecto;
use App\Cliente;
use App\Proceso;
use Carbon\Carbon;
use Auth;
use DB;


use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class proyectosProductosController extends BaseController
{

	const ITEM_PER_PAGE = 15;

	/************************************ Nuevos metodos para usar Resource*/
	public function OrdenesTerminadasSinEmbarcar($cliente_id)
    {
        return ProyectoProductoResource::collection(ProyectoProducto::getOrdenesTerminadasSinEmbarcar($cliente_id));
	}
	
	public function getOrdenesAbiertasByCliente($cliente_id)
    {
        return ProyectoProductoResource::collection(ProyectoProducto::getOrdenesAbiertasByCliente($cliente_id));
    }

	public function getDocumentosFromOrden(Request $request){
		$searchParams = $request->all();
        $proyecto_producto_id = Arr::get($searchParams, 'proyecto_producto_id', 0);
		return ProyectoProductoResource::collection(ProyectoProducto::getDocumentosFromOrden($proyecto_producto_id));
	}

	/**PRINCIPAL */
	public function getOrdenesAbiertasList(Request $request)
    {		
        $searchParams = $request->all();
        $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
		$mostrarTerminados = Arr::get($searchParams, 'mostrarTerminados', 0);
		$keyword = Arr::get($searchParams, 'keyword', '');
		$selectSearch = Arr::get($searchParams, 'selectSearch', '');

        return ProyectoProductoResource::collection(ProyectoProducto::getOrdenesAbiertasList());
	}

	public function storeProyectoProceso(Request $request){
        $proyectoProducto = new ProyectoProducto;
		request()->merge(['fecha_entrega' => Carbon::parse(request()->fecha_entrega)]);
        request()->merge(['fecha_promesa' => Carbon::parse(request()->fecha_promesa)]);
		 /*Aqui se actualiza/crea con la informacion que enviamos al request*/
		
		
		 if(request()->get('numero_parte') == ""){
			/**Conseguir primero proceso */
			$proyecto = Proyecto::find( request()->get('proyecto_id'));
			$primerProceso = $proyecto->getFirstProceso();
			$user_id = Auth::id();



			if(request()->get('agrupar')== 0){
				/** Si agrupar es igual a false creamos ordenes de acuerdo a la cantidad que se pidio */
				$cantidad = request()->get('cantidad');
				request()->merge(['cantidad' => 1]);

				for ($x = 0; $x < $cantidad; $x++) {
					$proyectoProducto = $proyectoProducto ->fill(request()->all())
												->updateOrCreate(['id' => request()->get('id')],$proyectoProducto->toArray());
	
					$proyectoProducto->numero_parte = 'OR-'.$proyectoProducto->id;
					$proyectoProducto->save();
					
					
					$proyectoProductoProceso = new ProyectoProcesoProducto;
					$proyectoProductoProceso->proyecto_producto_id = $proyectoProducto->id;
					$proyectoProductoProceso->proyecto_proceso_id = $primerProceso->id;
					$proyectoProductoProceso->user_id =$user_id;
					$proyectoProductoProceso->save();	
				}
			}else{
				/* si agrupor es igual a True se agrega la orden con la cantidad que pidio el usuario */

				$proyectoProducto = $proyectoProducto ->fill(request()->all())
												->updateOrCreate(['id' => request()->get('id')],$proyectoProducto->toArray());
	
				$proyectoProducto->numero_parte = 'OR-'.$proyectoProducto->id;
				$proyectoProducto->save();
				
				
				$proyectoProductoProceso = new ProyectoProcesoProducto;
				$proyectoProductoProceso->proyecto_producto_id = $proyectoProducto->id;
				$proyectoProductoProceso->proyecto_proceso_id = $primerProceso->id;
				$proyectoProductoProceso->user_id =$user_id;
				$proyectoProductoProceso->save();
			}
		}else{
			$proyectoProducto = $proyectoProducto ->fill(request()->all())
                                            ->updateOrCreate(['id' => request()->get('id')],$proyectoProducto->toArray());
		}

		return Proyecto::where('id',request()->get('proyecto_id'))->with(['Productos'])->get();
	}

	public function arreglarListado(){
		$proyectoProducto_list = ProyectoProducto::getOrdenesAbiertasList();
		foreach ($proyectoProducto_list as $key => $proyectoProducto) {
			if($proyectoProducto->ProyectoProcesoProducto->count() == 0){
				$user_id = Auth::id();
				$proyecto = Proyecto::find( $proyectoProducto->proyecto_id);
				$primerProceso = $proyecto->getFirstProceso();
				$proyectoProductoProceso = new ProyectoProcesoProducto;
				$proyectoProductoProceso->proyecto_producto_id = $proyectoProducto->id;
				$proyectoProductoProceso->proyecto_proceso_id = $primerProceso->id;
				$proyectoProductoProceso->user_id =$user_id;
				$proyectoProductoProceso->save();
			}
		}
	}

	public function deleteFromProject(Request $request){
		ProyectoProducto::find(request()->get('id'))->delete();
		return Proyecto::where('id',request()->get('proyecto_id'))->with(['Productos'])->get();
	}

	public function deleteMultipleFromProject(Request $request){
		$proyecto_producto_ids = array_map(function($producto){return $producto['proyecto_producto']['id'];}, request()->get('multipleSelection'));
		ProyectoProducto::whereIn('id', $proyecto_producto_ids)->delete();
		return Proyecto::where('id',request()->get('proyecto_id'))->with(['Productos'])->get();
	}

	public function updateMultiplePlanCorte(Request $request){
		/**Se obtienen los ids de los productos para mandarlos a actualizar */
		$proyecto_producto_ids = array_map(function($producto){return $producto['proyecto_producto']['id'];}, request()->get('multipleSelection'));
		/**Se actualiza */
		ProyectoProducto::whereIn('id', $proyecto_producto_ids)->update(['plan_corte' => request()->get('nuevoPlanCorte')]);

		return Proyecto::where('id',request()->get('proyecto_id'))->with(['Productos'])->get();
	}

	function getID($producto){
		return $producto->proyecto_producto->id;
	 }
	 
	
	/********* */

	 /** Funcion para obtener todos los materiales */
	 public function proyectosProductos(){
        return ProyectoProducto::loadOrdenesAbiertasWithAll();
	}

	/*Funcion para insertar o Actualizar un proyecto*/
	public function insert(){
		//return request();
        $proyectoProducto = new ProyectoProducto;
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/

		request()->merge(['fecha_entrega' => Carbon::parse(request()->fecha_entrega)]);
        request()->merge(['fecha_promesa' => Carbon::parse(request()->fecha_promesa)]);
		
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
