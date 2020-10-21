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
		$productos = Producto::with(['Cliente','Accesorios','Materiales','Materiales.Tipo_material','Materiales.Acero','Accesorios.Acero','Documentos'])->get();
		foreach ($productos as $key => $producto) {
			($producto->materiales)->each->loadNombreCompleto();
		}
        return $productos;
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert(){
		$producto = new Producto;
		/** Generamos numero de parte */
		if(request()->get('id') == 0){ 
			$ultimoProducto = Producto::orderBy('id', 'DESC')->first();//buscamos el ultimo id
            request()->merge(['numero_parte' =>  'PD-'.str_pad($ultimoProducto->id + 1, 8, "0", STR_PAD_LEFT)]);
		}
			
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $producto = $producto 	->fill(request()->all())
								->updateOrCreate(['id' => request()->get('id')],$producto->toArray());

		
		/* insertmaos los materiales del producto*/
		$producto->insertMateriales(request()->get('materiales'),$producto);

		/* insertmaos accesorios del producto*/
		$producto->insertAccesorios(request()->get('accesorios'),$producto);
		
	}

	/* Funcion para eliminar producto con id */
    public function delete(){
		
		$producto = Producto::find(request()->get('id'));
		$producto->Materiales()->detach();
		$producto->Accesorios()->detach();
		$producto->Documentos()->detach();

		$producto->delete();
	}
	/** Funcion para guardar archivos */
	public function store(Request $request)
    {
		if($request->file('file')){
			
			$producto = Producto::find($request->producto_id);
			$doc = $request->file('file');
		    $docDate = date('YmdHis');
	        $docNombre = 'doc-'.$docDate.'.'.$doc->clientExtension();
	        $nombreOriginal = $doc->getClientOriginalName();

			$doc->storeAs('public\uploads\productos\\'.$producto->numero_parte.'\documentos', $docNombre);

	        $documento = [
	        	'nombre_usuario' => $nombreOriginal,
	        	'nombre_real' => $nombreOriginal,
	        	'nombre_sistema' => $docNombre,
	        	'tipo_documento' => $doc->getClientOriginalExtension(),
	        	'url'=> 'public\uploads\productos\\'.$producto->numero_parte.'\documentos',
	        ];

	        $save = Documento::create($documento);
	        $producto->Documentos()->attach($save->id);

	        return (Producto::where('id',request()->get('producto_id'))->with(['Documentos'])->first());
		}
    }
	/** Funcion para eliminar archivos */
	public function deleteDocumento(){
		$producto = Producto::find(request()->get('producto_id'));
		$producto->Documentos()->detach(request()->get('documento_id'));
		$documento = Documento::find(request()->get('documento_id'));

		Storage::delete($documento->url."\\".$documento->nombre_sistema);
		$documento->delete();
		return (Producto::where('id',request()->get('producto_id'))->with(['Documentos'])->first());
	}
	/** Funcion para guardar archivos */
	public function downloadDocumento($documento_id){
		$documento = Documento::find($documento_id);
		$path = storage_path('app\\'.$documento->url."\\".$documento->nombre_sistema);
		$headers = array('Content-Type'=> 'application/'.$documento->tipo_documento);
		$nombre_doc = $documento->nombre_usuario;
		return response()->download($path,$nombre_doc,$headers);
	}

	

}
