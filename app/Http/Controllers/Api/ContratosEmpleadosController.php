<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ContratoEmpleadoResource;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\ContratoEmpleado;
use App\Empleado;
use App\HistorialAltaBajaEmpleado;
use App\HistorialSueldoEmpleado;
use Auth;
use DB;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class ContratosEmpleadosController extends BaseController
{

	const ITEM_PER_PAGE = 15;

	public function contratosByEmpleado($empleado_id)
    {
        return ContratoEmpleadoResource::collection(ContratoEmpleado::getContratosByEmpleado($empleado_id));
    }


    public function storeAlta(Request $request, ContratoEmpleado $empleado)
    {
        
        return DB::transaction(function () {
            //1. AGREGAR CONTRATO
            $contratoEmpleado = new ContratoEmpleado;
            
            $currentContrato = request()->get('currentContrato');
            $currentContrato['inicio_contrato'] = Carbon::parse($currentContrato['inicio_contrato']);
            $currentContrato['termino_contrato'] = Carbon::parse($currentContrato['termino_contrato']);
            $currentContrato['contrato_actual'] = 1;
            // if($currentContrato['ultimo_contrato'] != 0){
            //     $ultimo_contrato = ContratoEmpleado::where('id',$currentContrato['ultimo_contrato'])->first();
            //     $ultimo_contrato->contrato_actual = 0;
            //     $ultimo_contrato->update();
            // }
    
            $contratoEmpleado->fill($currentContrato);
            ContratoEmpleado::create($contratoEmpleado->toArray());

            //2. AGREGAR PONER FECHA INGRESO A EMPLEADO
            Empleado::withTrashed()->where('id', $currentContrato['empleado_id'])->restore();
            $empleado = Empleado::find($currentContrato['empleado_id']);
            $empleado->fecha_entrada = $currentContrato['inicio_contrato'];
            $empleado->update();

            //3. AGREGAR HISTORIAL ALTA BAJA
            $historialBajaEmpleado = [
                'empleado_id' => $currentContrato['empleado_id'],
                'tipo' => 1, //ALTA O BAJA
                'motivo' => '',
                'notas'=> '',
            ];
            HistorialAltaBajaEmpleado::create($historialBajaEmpleado);

            //4. AGREGAR HISTORIAL SUELDO
            $historialSueldoEmpleado = [
                'empleado_id' => $currentContrato['empleado_id'],
                'sueldo' => $currentContrato['sueldo'], //ALTA O BAJA
                'bono' => $currentContrato['bono'],
            ];
            HistorialSueldoEmpleado::create($historialSueldoEmpleado);
            
    
            return new contratoEmpleadoResource($contratoEmpleado);
        });
    }
}
