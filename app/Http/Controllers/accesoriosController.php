<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Accesorio;
use App\MaterialAcero;

class accesoriosController extends Controller
{

    /** Funcion para obtener todos los materiales */
    public function accesorios(){
        return Accesorio::with('Acero')->get();
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert()
    {
        $accesorio = new Accesorio;
        /*Creando sus procesos*/
        
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $accesorio = $accesorio     ->fill(request()->all())
                                        ->updateOrCreate(['id' => request()->get('id')],$accesorio->toArray());

        $accesorio->numero_parte = 'ACC-'.$accesorio->id;
        /**Crear numero parte si esta vacia */
        // if(request()->get('numero_parte') == ""){
        //     $accesorio->numero_parte = 'ACC-'.str_pad($proyecto->id + 1, 8, "0", STR_PAD_LEFT);
        //     $accesorio->update();
        // }
    }

    /* Funcion para eliminar con id */
    public function delete(){
        $accesorio = Accesorio::find(request()->get('id'))->delete();
    }


     public function show(){
    	$data['materialesAceros'] = MaterialAcero::All();
		$data['accesorios'] = Accesorio::All();
		return view('accesorios.show')->with($data);
	}
}
