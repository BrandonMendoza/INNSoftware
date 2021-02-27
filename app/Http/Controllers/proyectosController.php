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
use DB;
use Auth;

class proyectosController extends Controller
{
    /** Funcion para obtener todos los materiales */
    public function proyectos(){
        return ((Proyecto::orderBy('id','DESC')->with(['Cliente','Productos','Documentos.Documento_tipo'])->get())->each->loadTotalHrsLabor())->each->loadProgreso();
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert(){
        
        return DB::transaction(function () {
            //return request()->all();
            $proyecto = new Proyecto;
            /*Se le da formato a la fecha de entrega con Carbon*/
            request()->merge(['fecha_entrega' => Carbon::parse(request()->fecha_entrega)]);
            request()->merge(['fecha_promesa' => Carbon::parse(request()->fecha_promesa)]);
            
            /*Aqui se actualiza/crea con la informacion que enviamos al request*/
            $proyecto = $proyecto ->fill(request()->all())
                                                ->updateOrCreate(['id' => request()->get('id')],$proyecto->toArray());
            /*Creando sus procesos*/
            if(request()->get('numero_parte') == ""){
                $proyecto->numero_parte = 'PY-'.$proyecto->id;
                $proyecto->crearProcesos();
                $proyecto->update();
            }
            //Proyecto editado
            return Proyecto::where('id',$proyecto->id)->with(['Cliente','Productos'])->get();
        });
    }

    /* Funcion para eliminar producto con id */
    public function delete(){
		DB::transaction(function () {
			(Proyecto::with(['Documentos'])->find(request()->get('id')))->deleteDetach();
		});
    }
    
    /** Funcion para guardar archivos */
	public function store(Request $request)
    {
		DB::transaction(function () use ($request){
			if(request()->file('file')){
				$proyecto = Proyecto::find(request()->get('proyecto_id'));
				$proyecto->Documentos()->attach(Documento::store(request()->file('file'),
                                                'uploads/proyectos/'.$proyecto->numero_parte.'/documentos',
                                                request()->get("documento_tipo_id")));
			}
		});
		return (Proyecto::where('id',request()->get('proyecto_id'))->with(['Documentos.Documento_tipo'])->first());
    }

    /** Funcion para eliminar archivos */
	public function deleteDocumento(){
		DB::transaction(function () {
			(Proyecto::find(request()->get('proyecto_id')))->Documentos()->detach(request()->get('documento_id'));
			(Documento::find(request()->get('documento_id')))->deleteStorage();
		});

		return (Proyecto::where('id',request()->get('proyecto_id'))->with(['Documentos'])->first());
	}
    
	/** Funcion para guardar archivos */
	public function downloadDocumento($documento_id){
		return (Documento::find($documento_id))->download();
	}

    public function getProcesosFromProyecto(Request $request){
        $data['procesos'] = ProyectoProceso::where('proyecto_id',$request->proyecto_id)->with('Proceso')->get();
        
        $proyectoProducto = ProyectoProducto::  with('getProyectoProcesoProducto.ProyectoProceso.Proceso')
                                                ->where('id',$request->ordenAbierta_id)
                                                ->first();

        $data['lastProceso'] = $proyectoProducto->getLastProceso();
        return response()->json($data);
    }
}
