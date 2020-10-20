<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pintura;
use Auth;

class pinturasController extends Controller
{

	 /** Funcion para obtener todos los materiales */
	 public function pinturas(){
        return Pintura::get();
	}

	/*Funcion para insertar o Actualizar un proyecto*/
	public function insert(){
		//return request();
        $pintura = new Pintura;
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $pintura = $pintura ->fill(request()->all())
                                            ->updateOrCreate(['id' => request()->get('id')],$pintura->toArray());
    }

    /* Funcion para eliminar con id */
    public function delete(){
        $pintura = Pintura::find(request()->get('id'))->delete();
	}
    
}
