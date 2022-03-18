<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;
use App\Accesorio;
use App\Material;
use App\Cliente;
use App\Documento;
use Storage;
use DB;


class productosController extends Controller
{
    
	/** Funcion para obtener todos los materiales */
    public function productos(){
		$productos = Producto::orderBy('id','DESC')->with(['Cliente','Accesorios','Materiales','Materiales.Tipo_material','Materiales.Acero','Accesorios.Acero','Documentos','Pintura','Categorias'])->get();
		foreach ($productos as $key => $producto) {
			($producto->materiales)->each->loadNombreCompleto();
		}
		
        return $productos;
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert(){
		DB::transaction(function () {
			$producto = new Producto;
				
			/*Aqui se actualiza/crea con la informacion que enviamos al request*/
			$producto = $producto 	->fill(request()->all())
									->updateOrCreate(['id' => request()->get('id')],$producto->toArray());

			/** Generamos numero de parte */
			if(request()->get('numero_parte') == ""){ 
				$producto->numero_parte = 'PD-'.$producto->id;
				$producto->update();
			}
			/* insertmaos las categorias del producto*/
			$producto->insertCategorias(request()->get('categorias'));

			/* insertmaos los materiales del producto*/
			$producto->insertMateriales(request()->get('materiales'));

			/* insertmaos accesorios del producto*/
			$producto->insertAccesorios(request()->get('accesorios'));
		});
	}

	/* Funcion para eliminar producto con id */
    public function delete(){
		DB::transaction(function () {
			(Producto::with(['Documentos'])->find(request()->get('id')))->deleteDetach();
		});
	}
	/** Funcion para guardar archivos */
	public function store(Request $request)
    {
		DB::transaction(function () use ($request){
			if(request()->file('file')){
				$producto = Producto::find(request()->get('producto_id'));
				$producto->Documentos()->attach(Documento::store(request()->file('file'),'uploads/productos/'.$producto->numero_parte.'/documentos'));
			}
		});
		return (Producto::where('id',request()->get('producto_id'))->with(['Documentos'])->first());
    }
	/** Funcion para eliminar archivos */
	public function deleteDocumento(){
		DB::transaction(function () {
			(Producto::find(request()->get('producto_id')))->Documentos()->detach(request()->get('documento_id'));
			(Documento::find(request()->get('documento_id')))->deleteStorage();
		});

		return (Producto::where('id',request()->get('producto_id'))->with(['Documentos'])->first());
	}
	/** Funcion para guardar archivos */
	public function downloadDocumento($documento_id){
		return (Documento::find($documento_id))->download();
	}
}
