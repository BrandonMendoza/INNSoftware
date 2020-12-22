<?php

namespace App\Http\Controllers\Api;
use App\Http\Resources\ProductoResource;
use Illuminate\Http\Request;
use App\Producto;
use Storage;
use DB;


class productosController extends BaseController
{
    /************************************ Nuevos metodos para usar Resource*/
	public function getProductosByCliente($cliente_id)
    {
        return ProductoResource::collection(Producto::getProductosByCliente($cliente_id));
	}
}
