<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MaterialTipo;

class materialesTiposController extends Controller
{
    /** Funcion para obtener todos los materiales */
    public function tiposMateriales(){
        return MaterialTipo::get();
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert()
    {
        $materialTipo = new MaterialTipo;
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $materialTipo = $materialTipo   ->fill(request()->all())
                                        ->updateOrCreate(['id' => request()->get('id')],$materialTipo->toArray());
    }

    /* Funcion para eliminar con id */
    public function delete(){
        $materialTipo = MaterialTipo::find(request()->get('id'))->delete();
    }
}
