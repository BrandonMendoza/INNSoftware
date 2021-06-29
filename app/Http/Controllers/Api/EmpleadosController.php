<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\EmpleadoResource;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Empleado;
use Auth;
use DB;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class EmpleadosController extends BaseController
{

	const ITEM_PER_PAGE = 15;

	public function updateDeleted(Request $request, Empleado $empleado)
    {
        DB::transaction(function () {
            $empleado = new Empleado;
            $currentEmpleado = request()->get('current');
            $currentEmpleado['fecha_nacimiento'] = Carbon::parse($currentEmpleado['fecha_nacimiento']);
            $currentEmpleado['fecha_entrada'] = Carbon::parse($currentEmpleado['fecha_entrada']);

            $empleado = Empleado::withTrashed()->find($currentEmpleado['id']);
            $empleado->fill($currentEmpleado);
            $empleado->update();

            return new EmpleadoResource($empleado);
        });
    }
}
