<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\BajaEmpleadoResource;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\BajaEmpleado;
use Auth;
use DB;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class bajasEmpleadosController extends BaseController
{

	const ITEM_PER_PAGE = 15;

    public function getBajasbyEmpleado($empleado_id)
    {
        return BajaEmpleadoResource::collection(BajaEmpleado::getBajasbyEmpleado($empleado_id));
    }
}
