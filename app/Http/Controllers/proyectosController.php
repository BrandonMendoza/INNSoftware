<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Proyecto;
use App\Cliente;
use App\Proceso;
use App\Producto;
use Carbon\Carbon;
use App\ProyectoProducto;
use App\ProyectoProceso;
use App\ProyectoProcesoProducto;
use App\Documento;
use Storage;
use Auth;

class proyectosController extends Controller
{
    /** Funcion para obtener todos los materiales */
    public function proyectos(){
        return ((Proyecto::with(['Cliente','Productos','Documentos'])->get())->each->loadTotalHrsLabor())->each->loadProgreso();
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert(){
        $proyecto = new Proyecto;
        /*Se le da formato a la fecha de entrega con Carbon*/
        request()->merge(['fecha_entrega' => Carbon::parse(request()->fecha_entrega)]);
        
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $proyecto = $proyecto ->fill(request()->all())
                                            ->updateOrCreate(['id' => request()->get('id')],$proyecto->toArray());
        /*Creando sus procesos*/
        if(request()->get('numero_parte') == ""){
            $proyecto->numero_parte = 'PY-'.str_pad($proyecto->id + 1, 8, "0", STR_PAD_LEFT);
            $proyecto->crearProcesos();
            $proyecto->update();

            /* insertmaos los materiales del producto*/
            $proyecto->insertProductos(request()->get('productos'),Auth::id());
        }
		
        
    }

    /* Funcion para eliminar con id */
    public function delete(){
        $proyecto = Proyecto::find(request()->get('id'))->delete();
    }
    /** Funcion para guardar documentos del proyecto */
    public function store(Request $request)
    {
		if($request->file('file')){
			
			$proyecto = Proyecto::find($request->proyecto_id);
			$doc = $request->file('file');
		    $docDate = date('YmdHis');
	        $docNombre = 'dc-'.$docDate.'.'.$doc->clientExtension();
	        $nombreOriginal = $doc->getClientOriginalName();

	        $doc->storeAs('uploads\proyectos\\'.$proyecto->numero_parte.'\documentos', $docNombre);

	        $documento = [
	        	'nombre_usuario' => $nombreOriginal,
	        	'nombre_real' => $nombreOriginal,
	        	'nombre_sistema' => $docNombre,
	        	'tipo_documento' => $doc->getClientOriginalExtension(),
	        	'url'=> 'uploads\proyectos\\'.$proyecto->numero_parte.'\documentos',
	        ];

	        $save = Documento::create($documento);
	        $proyecto->Documentos()->attach($save->id);

	        return (Proyecto::where('id',request()->get('proyecto_id'))->with(['Documentos'])->first());
		}
    }

    /** Funcion para eliminar archivos */
	public function deleteDocumento(){
		$proyecto = Proyecto::find(request()->get('proyecto_id'));
		$proyecto->Documentos()->detach(request()->get('documento_id'));
		$documento = Documento::find(request()->get('documento_id'));
        Storage::delete($documento->url."\\".$documento->nombre_sistema);
		$documento->delete();
		return (Proyecto::where('id',request()->get('proyecto_id'))->with(['Documentos'])->first());
	}
	/** Funcion para descargar archivos */
	public function downloadDocumento($documento_id){
		$documento = Documento::find($documento_id);
		$path = storage_path('app\\'.$documento->url."\\".$documento->nombre_sistema);
		$headers = array('Content-Type'=> 'application/'.$documento->tipo_documento);
		$nombre_doc = $documento->nombre_usuario;
		return response()->download($path,$nombre_doc,$headers);
	}

    public function getProcesosFromProyecto(Request $request){
        $data['procesos'] = ProyectoProceso::where('proyecto_id',$request->proyecto_id)->with('Proceso')->get();
        
        $proyectoProducto = ProyectoProducto::  with('getProyectoProcesoProducto.ProyectoProceso.Proceso')
                                                ->where('id',$request->ordenAbierta_id)
                                                ->first();

        $data['lastProceso'] = $proyectoProducto->getLastProceso();
        return response()->json($data);
    }

    public function ordenesAbiertas(){
        $data = [  
            'clientes' => Cliente::All(),
            'procesos' => Proceso::All(),
            'OrdenesAbiertas' => ProyectoProducto::loadOrdenesAbiertasWithAll()
        ];
        return view('proyectosProductos.ordenesAbiertas')->with($data);
    }


    public function ordenAbiertaInsert(Request $request)
    {
        $ordenAbierta = [
            'cantidad' => $request->cantidad,
            'work_order' => $request->work_order,
            'item' => $request->item,
            'heat_number' => $request->heat_number,
        ];
        
        if($request->id != 0){
            //Si es editar
            $ordenAbierta += ['id' => $request->id];
            $save = ProyectoProducto::find($request->id)->update($ordenAbierta);
        }else{
            //Si es Agregar
            $save = ProyectoProducto::create($ordenAbierta);    
        }
        //consultamos todos los materialesClientes
        $ordenesAbiertas =  ProyectoProducto::loadOrdenesAbiertasWithAll();
        return response()->json($ordenesAbiertas); //Fin
    }

}
