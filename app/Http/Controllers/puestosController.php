<?php

namespace App\Http\Controllers;

use App\Puesto;
use Illuminate\Http\Request;
use App\Http\Resources\PuestoResource;
use Illuminate\Support\Arr;
use Carbon\Carbon;
use App\Documento;
use Validator;
use DB;

class puestosController extends Controller
{
    const ITEM_PER_PAGE = 0;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $searchParams = $request->all();
        $puestoQuery = Puesto::query();
        $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
        $departamento_id = Arr::get($searchParams, 'departamento_id', '');

        /*Si viene con ID se filtra */
        if ($departamento_id != 0) {
            $puestoQuery->where('departamento_id',$departamento_id);                
        }

        return PuestoResource::collection($puestoQuery->paginate($limit));
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
            $puesto = new Puesto;
            $current = request()->get('current');

            $puesto = $puesto   ->fill($current)
                                    ->updateOrCreate(['id' => $current['id']],$puesto->toArray());

            return new PuestoResource($puesto);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Puesto  $puesto
     * @return \Illuminate\Http\Response
     */
    public function show(Puesto $puesto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Puesto  $puesto
     * @return \Illuminate\Http\Response
     */
    public function edit(Puesto $puesto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Puesto  $puesto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Puesto $puesto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Puesto  $puesto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Puesto $puesto)
    {
        //
    }
}
