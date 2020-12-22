<?php

namespace App\Http\Controllers;

use App\Embarque;
use Illuminate\Http\Request;
use App\Http\Resources\EmbarqueResource;
use Illuminate\Support\Arr;
use Carbon\Carbon;
use App\Documento;
use Validator;
use DB;

class embarquesController extends Controller
{
    const ITEM_PER_PAGE = 15;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        $searchParams = $request->all();
        $embarqueQuery = Embarque::query();
        $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
        $keyword = Arr::get($searchParams, 'keyword', '');
        $id = Arr::get($searchParams, 'id', '');

        if (!empty($id) && $id != 0 ) {
            $embarqueQuery->where('id',$id);                
        }

        if (!empty($keyword)) {
            $embarqueQuery->where('numero_tarimas', 'LIKE', '%' . $keyword . '%');
            $embarqueQuery->where('precio_total', 'LIKE', '%' . $keyword . '%');
        }

        

        return EmbarqueResource::collection($embarqueQuery->with('ProyectosProductos.Producto','Cliente','Documentos')->paginate($limit));
        //return EmbarqueResource::collection(Embarque::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::transaction(function () {
            $embarque = new Embarque;
            $currentEmbarque = request()->get('current');
            $proyectosProductos = request()->get('ordenesSeleccionadas');

            $currentEmbarque['fecha_salida'] = Carbon::parse($currentEmbarque['fecha_salida']);
            $embarque = $embarque ->fill($currentEmbarque)
                                                ->updateOrCreate(['id' => $currentEmbarque['id']],$embarque->toArray());

            $embarque->storeProyectosProductos($proyectosProductos);                                                
            return new EmbarqueResource($embarque);
        });
    }

    /** Funcion para guardar archivos */
	public function storeDocumento(Request $request)
    {
		DB::transaction(function () use ($request){
			if(request()->file('file')){
				$embarque = Embarque::find(request()->get('embarque_id'));
				$embarque->Documentos()->attach(Documento::store(request()->file('file'),'uploads/embarques/'.$embarque->id.'/documentos'));
			}
		});
		return (Embarque::where('id',request()->get('embarque_id'))->with(['Documentos'])->first());
    }

    /** Funcion para eliminar archivos */
	public function deleteDocumento(){
		DB::transaction(function () {
			(Embarque::find(request()->get('embarque_id')))->Documentos()->detach(request()->get('documento_id'));
			(Documento::find(request()->get('documento_id')))->deleteStorage();
		});

		return (Embarque::where('id',request()->get('embarque_id'))->with(['Documentos'])->first());
	}
    
	/** Funcion para descargar archivos */
	public function downloadDocumento($documento_id){
		return (Documento::find($documento_id))->download();
	}

    public function getProcesosFromProyecto(Request $request){
        $data['procesos'] = ProyectoProceso::where('proyecto_id',$request->proyecto_id)->with('Proceso')->get();
        
        $proyectoProducto = ProyectoProducto::  with('getProyectoProcesoProducto.ProyectoProceso.Proceso')
                                                ->where('id',$request->ordenAbierta_id)
                                                ->first();

        $data['lastProceso'] = $proyectoProducto->getLastProceso();
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Embarque  $embarque
     * @return \Illuminate\Http\Response
     */
    public function show(Embarque $embarque)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Embarque  $embarque
     * @return \Illuminate\Http\Response
     */
    public function edit(Embarque $embarque)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Embarque  $embarque
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Embarque $embarque)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Embarque  $embarque
     * @return \Illuminate\Http\Response
     */
    public function destroy(Embarque $embarque)
    {
        //
    }
}
