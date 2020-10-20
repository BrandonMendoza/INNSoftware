<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;
use App\Proyecto;
use App\ProyectoProducto;
use App\Cliente;
use App\Pintura;
use App\Proceso;
use Carbon\Carbon;
use Auth;

class uploadExcelController extends Controller
{
	/** Funcion para obtener los procesos de los proyectos y el ultimo proceso  */
	public function getData(){
		$data['productos'] = Producto::get();
        $data['proyectos'] = Proyecto::get();
		$data['ordenesAbiertas'] = ProyectoProducto::get();
		$data['clientes'] = Cliente::get();
		$data['pinturas'] = Pintura::get();
        return $data;
	}
	
	public function insertOrdenesAbiertas(){
		$productos = collect(request()->get('list'));
		
		foreach ($productos as $key => $producto) {
			
			$productoBuscar = Producto::where('numero_parte_cliente', '=', $producto['numero_parte_producto'])->first();
			/**Si no existe creamos el producto */
			if ($productoBuscar === null) {
				$ultimoProducto = Producto::orderBy('id', 'DESC')->first();//buscamos el ultimo id
				$peso_lbs = number_format((float)((float)$producto['peso_kg']*2.2046), 2, '.', '');
				
				$crearProducto = [
					'numero_parte_cliente' => $producto['numero_parte_producto'],
					'pintura_id' =>  $producto['pintura_id'],
					'peso_kg' =>  $producto['peso_kg'],
					'peso_lbs' =>  $peso_lbs,
					'cliente_id' =>  $producto['cliente_id'],
					'numero_parte' => 'PD-'.str_pad($ultimoProducto->id + 1, 8, "0", STR_PAD_LEFT)
				];
				$productoBuscar = Producto::create($crearProducto);
			}

			//crear Proyecto
			$proyectoBuscar = Proyecto::where('plan_corte', '=', $producto['plan_corte'])->first();
			/**Si no existe creamos el proyecto */
			if($proyectoBuscar === null){
				$crearProyecto = [
					'cliente_id' =>  $producto['cliente_id'],
					'plan_corte' => $producto['plan_corte'],
					'fecha_entrega' => $producto['fecha_entrega'],
				];
				if(isset($producto['numero_parte_proyecto'])){
					$crearProyecto->numero_parte_cliente = $producto['numero_parte_proyecto'];
				}

				$proyectoBuscar = Proyecto::create($crearProyecto);
				$proyectoBuscar->numero_parte = 'PY-'.str_pad($proyectoBuscar->id + 1, 8, "0", STR_PAD_LEFT);
				$proyectoBuscar->crearProcesos();
				$proyectoBuscar->update();
			}

			//se busca si el proyecto ya tiene la orden abierta
			$ordenAbierta = ProyectoProducto::	where([['proyecto_id',$proyectoBuscar->id],['producto_id',$productoBuscar->id]])->first();
			if($ordenAbierta === null){
				$proyectoBuscar->Productos()
								->attach($productoBuscar->id,
									[   'cantidad' => $producto['cantidad'],
										'item' => $producto['item'],
										'work_order' => $producto['orden_trabajo'],
										'fecha_entrega' => $producto['fecha_entrega'],
									]);

				$proyectoBuscar->attachProyectoProductoProceso(Auth::id(),$productoBuscar->id);
			}
			

		}
	}

	public function downloadPlantilla(){
		$path = storage_path("app\\public\\Plantilla.xlsx");
		$headers = array('Content-Type'=> 'application/xlsx');
		$nombre_doc = "Plantilla.xlsx";
		return response()->download($path,$nombre_doc,$headers);
	}

    
}
