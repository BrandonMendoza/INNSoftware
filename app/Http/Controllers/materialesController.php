<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Material;
use App\MaterialAcero;
use App\MaterialTipo;
use Carbon\Carbon;

class materialesController extends Controller
{
    /** Funcion para obtener todos los materiales */
    public function materiales(){
        //return (Material::with('Acero','Tipo_material')->get())->each->loadMedidas();
        return (Material::with('Acero','Tipo_material')->get());
    }
    
    public function materialesWithNombreCompleto(){
        return (Material::with('Acero','Tipo_material')->get())->each->loadNombreCompleto();
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert()
    {
        $material = new Material;
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $material = $material     ->fill(request()->all())
                                        ->updateOrCreate(['id' => request()->get('id')],$material->toArray());
        $material->numero_parte = 'MAT-'.$material->id;
        $material->save();
    }

    /* Funcion para eliminar con id */
    public function delete(){
        $material = Material::find(request()->get('id'))->delete();
    }
}
