<?php

namespace App\Http\Controllers;

use App\Empleado;
use Illuminate\Http\Request;
use App\Http\Resources\EmpleadoResource;
use Illuminate\Support\Arr;
use Carbon\Carbon;
use App\Documento;
use Validator;
use DB;


class empleadosController extends Controller
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
        $empleadoQuery = Empleado::query();
        $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
        $keyword = Arr::get($searchParams, 'keyword', '');
        $id = Arr::get($searchParams, 'id', '');
        $bajas = Arr::get($searchParams, 'bajas', 0);

        /*Si viene con ID se filtra */
        if (!empty($id) && $id != 0 ) {
            $empleadoQuery->where('id',$id);                
        }

        if (!empty($keyword)) {
            //$empleadoQuery->where('numero_tarimas', 'LIKE', '%' . $keyword . '%');
            //$empleadoQuery->where('precio_total', 'LIKE', '%' . $keyword . '%');
        }
        /*Si viene con ID se filtra */
        if ($bajas == 1) {
            return EmpleadoResource::collection($empleadoQuery->onlyTrashed()->with('Estado','Puesto.Departamento')->paginate($limit));
        }
        return EmpleadoResource::collection($empleadoQuery->with('Estado','Puesto.Departamento')->paginate($limit));
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
            $empleado = new Empleado;
            $currentEmpleado = request()->get('current');
            $currentEmpleado['fecha_nacimiento'] = Carbon::parse($currentEmpleado['fecha_nacimiento']);
            $currentEmpleado['fecha_entrada'] = Carbon::parse($currentEmpleado['fecha_entrada']);

            $empleado = $empleado   ->fill($currentEmpleado)
                                    ->updateOrCreate(['id' => $currentEmpleado['id']],$empleado->toArray());
                        
            if(request()->get('numero_empleado') == ""){
                $empleado->numero_empleado = 'EM-'.$empleado->id;
                $empleado->update();
            }

            return new EmpleadoResource($empleado);
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
        DB::transaction(function () {
            $empleado = new Empleado;
            $currentEmpleado = request()->get('current');
            $currentEmpleado['fecha_nacimiento'] = Carbon::parse($currentEmpleado['fecha_nacimiento']);
            $currentEmpleado['fecha_entrada'] = Carbon::parse($currentEmpleado['fecha_entrada']);

            $empleado = $empleado->fill($currentEmpleado);
            $empleado->update();

            return new EmpleadoResource($empleado);
        });
    }

    public function updateDeleted(Request $request, Empleado $empleado)
    {
        DB::transaction(function () {
            $empleado = new Empleado;
            $currentEmpleado = request()->get('current');
            $currentEmpleado['fecha_nacimiento'] = Carbon::parse($currentEmpleado['fecha_nacimiento']);
            $currentEmpleado['fecha_entrada'] = Carbon::parse($currentEmpleado['fecha_entrada']);

            $empleado = $empleado->fill($currentEmpleado);
            $empleado->update();

            return new EmpleadoResource($empleado);
        });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Empleado  $empleado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Empleado $empleado)
    {
        return DB::transaction(function () use ($empleado) {
            Empleado::find($empleado->id)->delete();
            return  [ 'message' => 'Empleado dado de baja correctamente.',  'type' => 'success'];
		});
    }
}
