<?php

namespace App\Http\Controllers;

use App\BajaEmpleado;
use App\Empleado;
use App\HistorialAltaBajaEmpleado;
use App\ContratoEmpleado;
use Illuminate\Http\Request;
use App\Http\Resources\BajaEmpleadoResource;
use DB;
use Carbon\Carbon;

class BajasEmpleadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        return DB::transaction(function () {
            
            $bajaEmpleado = new BajaEmpleado;
            $historialBajaEmpleado = new HistorialAltaBajaEmpleado;
            $empleado = new Empleado();
            
            $currentBaja = request()->get('current');
            $currentBaja['fecha_baja'] = Carbon::parse($currentBaja['fecha_baja']);
            $currentBaja['fecha_inicial_labores'] = Carbon::parse($currentBaja['fecha_inicial_labores']);
            $currentBaja['contrato_actual'] = 1;

            $historialBajaEmpleado = [
                'empleado_id' => $currentBaja['empleado_id'],
                'tipo' => 0, //ALTA O BAJA
                'motivo' => $currentBaja['motivo'],
                'notas'=> $currentBaja['notas'],
            ];
            //Create Historial Baja Empleado
            HistorialAltaBajaEmpleado::create($historialBajaEmpleado);
            $bajaEmpleado = $bajaEmpleado   ->fill($currentBaja)
                                    ->updateOrCreate(['id' => $currentBaja['id']],$bajaEmpleado->toArray());

            $empleado = Empleado::find($currentBaja['empleado_id']);
            $empleado->fecha_entrada = null;
            $empleado->update();
            $contratos = ContratoEmpleado::where('empleado_id',$empleado->id);

            foreach ($contratos as $key => $contrato) {
                $contrato->contrato_actual =0;
                $contrato->update();
            }

            $empleado->delete();

            return new BajaEmpleadoResource($bajaEmpleado);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BajaEmpleado  $bajaEmpleado
     * @return \Illuminate\Http\Response
     */
    public function show(BajaEmpleado $bajaEmpleado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BajaEmpleado  $bajaEmpleado
     * @return \Illuminate\Http\Response
     */
    public function edit(BajaEmpleado $bajaEmpleado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BajaEmpleado  $bajaEmpleado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BajaEmpleado $bajaEmpleado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BajaEmpleado  $bajaEmpleado
     * @return \Illuminate\Http\Response
     */
    public function destroy(BajaEmpleado $bajaEmpleado)
    {
        //
    }
}
