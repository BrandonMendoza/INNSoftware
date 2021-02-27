<?php

namespace App\Http\Controllers;

use App\Departamento;
use Illuminate\Http\Request;
use App\Http\Resources\DepartamentoResource;
use Illuminate\Support\Arr;
use Carbon\Carbon;
use App\Documento;
use Validator;
use DB;

class departamentosController extends Controller
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
        $departamentoQuery = Departamento::query();
        $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
        $keyword = Arr::get($searchParams, 'keyword', '');
        $id = Arr::get($searchParams, 'id', '');

        /*Si viene con ID se filtra */
        if (!empty($id) && $id != 0 ) {
            $departamentoQuery->where('id',$id);                
        }

        if (!empty($keyword)) {
            //$empleadoQuery->where('numero_tarimas', 'LIKE', '%' . $keyword . '%');
            //$empleadoQuery->where('precio_total', 'LIKE', '%' . $keyword . '%');
        }
        return DepartamentoResource::collection($departamentoQuery->paginate($limit));
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
            $departamento = new Departamento;
            $current = request()->get('current');
            // $currentEmpleado['fecha_nacimiento'] = Carbon::parse($currentEmpleado['fecha_nacimiento']);
            // $currentEmpleado['fecha_entrada'] = Carbon::parse($currentEmpleado['fecha_entrada']);

            $departamento = $departamento   ->fill($current)
                                    ->updateOrCreate(['id' => $current['id']],$departamento->toArray());

            return new DepartamentoResource($departamento);
        });
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
     * @param  \App\Departamento  $departamento
     * @return \Illuminate\Http\Response
     */
    public function show(Departamento $departamento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Departamento  $departamento
     * @return \Illuminate\Http\Response
     */
    public function edit(Departamento $departamento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Departamento  $departamento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Departamento $departamento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Departamento  $departamento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Departamento $departamento)
    {
        //
    }
}
