<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\HistorialAltaBajaEmpleadoResource;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Empleado;
use App\HistorialAltaBajaEmpleado;
use Auth;
use DB;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class HistorialAltasBajasEmpleadosController extends BaseController
{

	const ITEM_PER_PAGE = 15;

	public function historialByEmpleado($empleado_id)
    {
        return HistorialAltaBajaEmpleadoResource::collection(HistorialAltaBajaEmpleado::getHistorialByEmpleado($empleado_id));
    }


    
}
