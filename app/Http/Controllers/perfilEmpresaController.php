<?php

namespace App\Http\Controllers;

use App\PerfilEmpresa;
use Illuminate\Http\Request;
use App\Http\Resources\PerfilEmpresaResource;
use Illuminate\Support\Arr;
use Carbon\Carbon;
use App\Documento;
use Validator;
use DB;


class perfilEmpresaController extends Controller
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
        $perfilEmpresaQuery = PerfilEmpresa::query();
        $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
        $keyword = Arr::get($searchParams, 'keyword', '');
        $id = Arr::get($searchParams, 'perfil_empresa_id', '');

        /*Si viene con ID se filtra */
        if (!empty($id) && $id != 0 ) {
            $perfilEmpresaQuery->where('id',$id);                
        }

        return PerfilEmpresaResource::collection($perfilEmpresaQuery->with(['Estado','Logo'])->paginate($limit));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getImgUrl(){

    }

    public function store(Request $request)
    {
        DB::transaction(function () {
            $perfilEmpresa = new PerfilEmpresa;
            $currentPerfilEmpresa = request()->get('current');

            $perfilEmpresa = $perfilEmpresa   ->fill($currentPerfilEmpresa)
                                    ->updateOrCreate(['id' => $currentPerfilEmpresa['id']],$perfilEmpresa->toArray());

            return new PerfilEmpresaResource($perfilEmpresa);
        });
    }


    /** Funcion para guardar archivos */
	public function storeDocumento(Request $request)
    {
		DB::transaction(function () use ($request){
			if(request()->file('file')){
				$perfilEmpresa = PerfilEmpresa::find(request()->get('perfil_empresa_id'));
                if($perfilEmpresa->logo_documento_id != null){
                    $documento_id = $perfilEmpresa->logo_documento_id;
			        $perfilEmpresa->logo_documento_id = null;
                    $perfilEmpresa->save();

                    $documento = Documento::find($documento_id);
                    $documento->deleteFromStorage();
                    $documento->delete();
                }
                $perfilEmpresa->logo_documento_id = Documento::store(request()->file('file'),'uploads/PerfilEmpresa/'.$perfilEmpresa->id.'/documentos',1);
                $perfilEmpresa->save();
				//$perfilEmpresa->Documentos()->attach(Documento::store(request()->file('file'),'uploads/embarques/'.$perfilEmpresa->id.'/documentos'));
			}
		});
		return (PerfilEmpresa::where('id',request()->get('perfil_empresa_id'))->with(['Logo'])->first());
    }

    /** Funcion para eliminar archivos */
	public function deleteDocumento(){
		DB::transaction(function () {
            $perfilEmpresa = PerfilEmpresa::find(request()->get('perfil_empresa_id'));
            $documento_id = $perfilEmpresa->logo_documento_id;
			$perfilEmpresa->logo_documento_id = null;
            $perfilEmpresa->save();
			$documento = Documento::find($documento_id);
            $documento->deleteFromStorage();
            $documento->delete();
		});
	}
    
	/** Funcion para descargar archivos */
	public function downloadDocumento($documento_id){
		return (Documento::find($documento_id))->download();
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
     * Display the specified resource.
     *
     * @param  \App\Empleado  $empleado
     * @return \Illuminate\Http\Response
     */
    public function show(Empleado $empleado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Empleado  $empleado
     * @return \Illuminate\Http\Response
     */
    public function edit(Empleado $empleado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Empleado  $empleado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Empleado $empleado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Empleado  $empleado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Empleado $empleado)
    {
        //
    }
}
