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
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $accesorio = $accesorio     ->fill(request()->all())
                                        ->updateOrCreate(['id' => request()->get('id')],$accesorio->toArray());
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

	// public function delete(Request $request){
	// 	//buscar y eliminar
	// 	$accesorio = Accesorio::find($request->id);
	// 	$accesorio->delete();

	// 	//Obtener listado actualizado para mostrar en Show.blade.php
    //     $accesorios = Accesorio::with(['Acero'])->get();
    //     return response()->json($accesorios);//Fin
	// }
}
