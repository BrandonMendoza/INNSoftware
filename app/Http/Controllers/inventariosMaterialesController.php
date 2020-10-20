<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Inventario_Material;
use App\Material;
use App\Accesorio;
use App\Cliente;
use App\MaterialCliente;
use App\StatusInventarioMaterial;
use Carbon\Carbon;
class inventariosMaterialesController extends Controller
{

    /** Funcion para obtener todos los materiales */
    public function inventariosMateriales(){
        $inventarios = Inventario_Material::with(['Material.Acero','Accesorio.Acero','Material_cliente.Cliente','Status'])->get();    
        foreach ($inventarios as $key => $inventario) {
            $inventario->loadPesoMaterial();
            $inventario->loadNombreCompleto();
            $inventario->loadAcero();
        }
        return $inventarios;        
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert(){
        /*Crear/actualizar el cliente de el material*/
        if(request()->get('cliente_id') != ""){
             /**Crear actualizar inventario */
            $material_cliente = new MaterialCliente;
            /*Aqui se actualiza/crea con la informacion que enviamos al request*/
            $material_cliente->fill(request()->except('id'));
            $material_cliente['id'] = request()->get('material_cliente_id');
            $material_cliente = $material_cliente->updateOrCreate(['id' => request()->get('material_cliente_id')],$material_cliente->toArray());
            request()->merge(['material_cliente_id' => $material_cliente->id]);
        }else{
            request()->merge(['material_cliente_id' => null]);
        }
        /**Crear actualizar inventario */
        $inventario_Material = new Inventario_Material;
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $inventario_Material = $inventario_Material ->fill(request()->all())
                                        ->updateOrCreate(['id' => request()->get('id')],$inventario_Material->toArray());

    }

    /* Funcion para eliminar con id */
    public function delete(){
        $inventario_Material = Inventario_Material::find(request()->get('id'))->delete();
    }

    /* Funcion para obtener materialesAccesorios por catalogo y cliente*/
    public function getMaterialesAccesoriosByCatalogo(){
        if(request()->get('catalogo') == 1){
            return (Material::with(['Tipo_material'])->get())->each->loadNombreCompleto();
        }
        return Accesorio::get();
    }

    /**Funcion para obtener el MaterialCliente por cliente_id y material_id */
    public function getMaterialClienteByMaterialCliente(){
        return MaterialCliente::where([ ['cliente_id',request()->get('cliente_id')],
                                        ['material_id',request()->get('material_id')]])->first();
    }

    public function editing(Request $request){
        $inventarioMaterial = Inventario_Material::find($request->id);
        switch ($request->editing) {
            case 0:
                $inventarioMaterial->is_editing = $request->editing;
                $inventarioMaterial->editing_at = null;
                $inventarioMaterial->update();
                return true;
                break;
            
            case 1:
                if($inventarioMaterial->is_editing == 0){
                    $inventarioMaterial->is_editing = $request->editing;
                    $inventarioMaterial->editing_at = Carbon::now();
                    $inventarioMaterial->update();
                    return true;
                }else{
                    return 0;
                }
                break;
        }
    }

}
