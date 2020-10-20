<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MaterialAcero;

class materialesAcerosController extends Controller
{
    /** Funcion para obtener todos los materiales */
    public function tiposMateriales(){
        return MaterialAcero::get();
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert()
    {
        $materialAcero = new MaterialAcero;
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $materialAcero = $materialAcero     ->fill(request()->all())
                                            ->updateOrCreate(['id' => request()->get('id')],$materialAcero->toArray());
    }

    /* Funcion para eliminar con id */
    public function delete(){
        $materialAcero = MaterialAcero::find(request()->get('id'))->delete();
    }
}
