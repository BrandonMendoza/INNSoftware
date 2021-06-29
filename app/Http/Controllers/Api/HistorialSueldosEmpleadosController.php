<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\HistorialSueldoEmpleadoResource;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Empleado;
use App\HistorialSueldoEmpleado;
use Auth;
use DB;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class HistorialSueldosEmpleadosController extends BaseController
{

	const ITEM_PER_PAGE = 15;

	public function historialSueldoByEmpleado($empleado_id)
    {
        return HistorialSueldoEmpleadoResource::collection(HistorialSueldoEmpleado::getHistorialSueldoByEmpleado($empleado_id));
    }


    
}
