<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProyectoProductoResource;
use Illuminate\Http\Request;
use App\ProyectoProducto;
use App\ProyectoProceso;
use App\ProyectoProcesoProducto;
use App\ProyectoProductoComentario;
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
		$rangoFechas = Arr::get($searchParams, 'rangoFechas', '');
		$keyword = Arr::get($searchParams, 'keyword', '');
		$selectSearch = Arr::get($searchParams, 'selectSearch', '');

        return ProyectoProductoResource::collection(ProyectoProducto::getOrdenesAbiertasList($mostrarTerminados,$rangoFechas));
	}


	public function getOrdenesTerminadasSinEmbarcar(Request $request)
    {		
        $searchParams = $request->all();
        $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
		$mostrarTerminados = Arr::get($searchParams, 'mostrarTerminados', 0);
		$keyword = Arr::get($searchParams, 'keyword', '');
		$selectSearch = Arr::get($searchParams, 'selectSearch', '');

        return ProyectoProductoResource::collection(ProyectoProducto::getOrdenesTerminadasSinEmbarcarList($mostrarTerminados));
	}


	public function getOrdenesAbiertasListByCliente(Request $request)
    {		
        $searchParams = $request->all();
        $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
		$mostrarTerminados = Arr::get($searchParams, 'mostrarTerminados', 0);
		$cliente_id = Arr::get($searchParams, 'cliente_id', 0);

        return ProyectoProductoResource::collection(ProyectoProducto::getOrdenesAbiertasListByCliente($cliente_id));
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

	public function arreglarListado(Request $request){
		$searchParams = $request->all();
		$mostrarTerminados = Arr::get($searchParams, 'mostrarTerminados', 0);
		$rangoFechas = Arr::get($searchParams, 'rangoFechas', '');


		$proyectoProducto_list = ProyectoProducto::getOrdenesAbiertasList($mostrarTerminados,$rangoFechas);
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

	/* Funcion para insertar multiple cambios en ordenes abiertas */
	public function insertMultipleOrdenesAbiertas(Request $request){
		DB::transaction(function () { 
			/* Actualizando los procesos de cada Proyecto producto */
			foreach (request()->get('productosSelect') as $key => $proyectoProcesoProducto) {
				/*Se busca el PPP de el producto y el proceso*/
				$proyectoProcesoProductoActual = ProyectoProcesoProducto::	orderBy('created_at','DESC') ->where([ 
																				['proyecto_proceso_id',$proyectoProcesoProducto['Proceso']['proyecto_proceso_id']],
																				['proyecto_producto_id',$proyectoProcesoProducto['Proceso']['proyecto_producto_id']]
																			])	
																			->first();

				
				if($proyectoProcesoProductoActual['proyecto_proceso_id'] != $proyectoProcesoProducto['Proceso']['proyecto_proceso']['id']){
					/*Se actualiza  el proceso anterior*/
					$proyectoProcesoProductoActual['terminado_el'] = Carbon::now()->toDateTimeString();
					$proyectoProcesoProductoActual->update();

					/*Se preparan los datos del From para introducirse a la BD*/
					$proyectoProcesoProductoNuevo = new ProyectoProcesoProducto;
					$proyectoProcesoProductoNuevo = [
						'proyecto_proceso_id' => $proyectoProcesoProducto['Proceso']['proyecto_proceso']['id'],
						'proyecto_producto_id' => $proyectoProcesoProducto['Proceso']['proyecto_producto_id'],
						'user_id' => Auth::id(),
						'iniciado_el' => Carbon::now()->toDateTimeString(),
					];
					ProyectoProcesoProducto::create($proyectoProcesoProductoNuevo);
				}

				/*Agregamos el comentario */
				if(request()->get('comentario_general') != ""){
					$proyectoProductoComentario = new ProyectoProductoComentario;
					$proyectoProductoComentario->comentario = request()->get('comentario_general');
					$proyectoProductoComentario->usuario_id = Auth::id();
					$proyectoProductoComentario->proyecto_producto_id = $proyectoProcesoProducto['Proceso']['proyecto_producto_id'];
					$proyectoProductoComentario->proyecto_proceso_id = $proyectoProcesoProducto['Proceso']['proyecto_proceso']['id'];
					ProyectoProductoComentario::create($proyectoProductoComentario->toArray());
				}
				

				/*Actualizamos todos los demas datos */
				$proyectoProducto = ProyectoProducto::find($proyectoProcesoProducto['Proceso']['proyecto_producto_id']);

				if(request()->get("fecha_entrega") != "")
					$proyectoProducto->fecha_entrega = Carbon::parse(request()->get("fecha_entrega"));

				if(request()->get("fecha_promesa") != "")
					$proyectoProducto->fecha_promesa = Carbon::parse(request()->get("fecha_promesa"));

				if(request()->get('work_order') != "")
					$proyectoProducto->work_order = request()->get('work_order');

				if(request()->get('item') != "")
					$proyectoProducto->item = request()->get('item');

				if(request()->get('precio_pesos') != "")
					$proyectoProducto->precio_pesos = request()->get('precio_pesos');

				if(request()->get('precio_dlls') != "")
					$proyectoProducto->precio_dlls = request()->get('precio_dlls');

				$proyectoProducto->update();

			}

		});
	}

	/* Funcion para obtener los procesos de un ProyectoProducto */
	public function getProcesosFromProyectoProducto(Request $request){
		$procesos = ProyectoProceso::orderBy('orden','ASC')->where([	['proyecto_id',request()->get('proyecto_id')],['es_estatico',0]])->with('Proceso')->get();

		$primerProceso = ProyectoProceso::where([['proyecto_id',request()->get('proyecto_id')],['es_primero',1]])->with('Proceso')->first();
		$ultimoProceso = ProyectoProceso::where([['proyecto_id',request()->get('proyecto_id')],['es_ultimo',1]])->with('Proceso')->first();

		$procesos->prepend($primerProceso);
		$procesos->push($ultimoProceso);
		
		return $procesos;
	}

    
}
