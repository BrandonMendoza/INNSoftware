<?php

namespace App\Http\Controllers\Api;
    
use App\Http\Resources\ProyectoProductoComentarioResource;
use Illuminate\Http\Request;
use App\ProyectoProductoComentario;
use Carbon\Carbon;
use Auth;
use DB;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class proyectosProductosComentariosController extends BaseController
{

	const ITEM_PER_PAGE = 15;

	public function storeProyectoProductoComentario(Request $request){
		return DB::transaction(function () {
            //1. AGREGAR CONTRATO
            $proyectoProductoComentario = new ProyectoProductoComentario;
            $currentProyectoProductoComentario = request()->get('current');
			$currentProyectoProductoComentario['usuario_id'] = Auth::id();
            $proyectoProductoComentario->fill($currentProyectoProductoComentario);
            ProyectoProductoComentario::create($proyectoProductoComentario->toArray());
            return new ProyectoProductoComentarioResource($proyectoProductoComentario);
        });     
	}

	public function getProyectoProducoComentarioByProyectoProducto($proyecto_producto_id)
    {
        return ProyectoProductoComentarioResource::collection(ProyectoProductoComentario::getProyectoProducoComentarioByProyectoProducto($proyecto_producto_id));
    }

    
}
