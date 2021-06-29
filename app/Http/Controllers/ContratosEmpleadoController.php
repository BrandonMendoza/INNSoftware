<?php

namespace App\Http\Controllers;

use App\ContratoEmpleado;
use App\HistorialSueldoEmpleado;
use App\Http\Resources\ContratoEmpleadoResource;
use App\HistorialAltaBajaEmpleado;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class ContratosEmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ContratoEmpleadoResource::collection(ContratoEmpleado::all()->sortByDesc('inicio_contrato'));
    }

    public function contratosByEmpleado($empleado_id)
    {
        return ContratoEmpleadoResource::collection(ContratoEmpleado::all()->where('empleado_id',$empleado_id)->sortByDesc('inicio_contrato'));
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
            $contratoEmpleado = new ContratoEmpleado;

            $currentContrato = request()->get('current');
            $currentContrato['inicio_contrato'] = Carbon::parse($currentContrato['inicio_contrato']);
            $currentContrato['termino_contrato'] = Carbon::parse($currentContrato['termino_contrato']);
            $currentContrato['contrato_actual'] = 1;
            if($currentContrato['ultimo_contrato'] != 0){
                $ultimo_contrato = ContratoEmpleado::where('id',$currentContrato['ultimo_contrato'])->first();
                $ultimo_contrato->contrato_actual = 0;
                $ultimo_contrato->update();
            }

            $contratoEmpleado = $contratoEmpleado   ->fill($currentContrato)
                                    ->updateOrCreate(['id' => $currentContrato['id']],$contratoEmpleado->toArray());
            //Historial Sueldo Empleado
            $historialSueldoEmpleado = [
                'empleado_id' => $currentContrato['empleado_id'],
                'sueldo' => $currentContrato['sueldo'], //ALTA O BAJA
                'bono' => $currentContrato['bono'],
            ];
            HistorialSueldoEmpleado::create($historialSueldoEmpleado);

            //3. AGREGAR HISTORIAL ALTA BAJA
            $historialBajaEmpleado = [
                'empleado_id' => $currentContrato['empleado_id'],
                'tipo' => 1, //ALTA O BAJA
                'motivo' => 'Alta por Contrato',
                'notas'=> '',
            ];
            HistorialAltaBajaEmpleado::create($historialBajaEmpleado);

            return new contratoEmpleadoResource($contratoEmpleado);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ContratoEmpleado  $contratoEmpleado
     * @return \Illuminate\Http\Response
     */
    public function show(ContratoEmpleado $contratoEmpleado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ContratoEmpleado  $contratoEmpleado
     * @return \Illuminate\Http\Response
     */
    public function edit(ContratoEmpleado $contratoEmpleado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ContratoEmpleado  $contratoEmpleado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ContratoEmpleado $contratoEmpleado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ContratoEmpleado  $contratoEmpleado
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContratoEmpleado $contratoEmpleado)
    {
        return DB::transaction(function () use ($contratoEmpleado) {
            if($contratoEmpleado->firmado == 1){
                return  [ 'message' => 'No se puede eliminar un contrato firmado.',  'type' => 'error'];
            }else{
                ContratoEmpleado::find($contratoEmpleado->id)->delete();
                return  [ 'message' => 'Contrato eliminado correctamente.',  'type' => 'success'];
            }
		});
    }
}
