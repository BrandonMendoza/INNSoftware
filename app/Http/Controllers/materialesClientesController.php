<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MaterialCliente;
use App\Cliente;
use App\Material;
use App\Accesorio;

class materialesClientesController extends Controller
{
    /** Funcion para obtener todos los materiales */
    public function materialesClientes(){
        return (MaterialCliente::with(['Cliente'])->get())->each->loadNombreMaterialAccesorio();
	}

    /*Funcion para insertar o Actualizar un proyecto*/
    public function insert(){
		$materialCliente = new MaterialCliente;
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $materialCliente = $materialCliente ->fill(request()->all())
                                            ->updateOrCreate(['id' => request()->get('id')],$materialCliente->toArray());
    }

    /* Funcion para eliminar con id */
    public function delete(){
        $materialCliente = MaterialCliente::find(request()->get('id'))->delete();
    }

    /** Funcion para obtener obtener Materiales o Accesorios de acuerdo a el catalogo seleccionado */
    public function getMaterialesAccesoriosByCatalogo(){
        if(request()->get('catalogo') == 1)
            return $accesoriosMateriales = (Material::with(['Tipo_material'])->get())->each->loadNombreCompleto();
        return $accesoriosMateriales = Accesorio::get();
    }

    public function getMaterialesClientes(Request $request){
        return response()->json(MaterialCliente::   where('cliente_id', $request->cliente_id)->
                                                    with(['Material','Material.Tipo_material'])->get());
    }

    public function getMaterialesClientesByCatalogoCliente(Request $request){
        return response()->json(MaterialCliente::   where('catalogo', $request->catalogo)->
                                                    where('cliente_id', $request->cliente_id)->
                                                    with(['Material','Material.Tipo_material','Accesorio'])->get());
    }

    public function getMaterialesAccesoriosClientes(Request $request){
        if($request->catalogo == 1){
            $accesoriosMateriales = Material::with(['Tipo_material'])->get();
        }else{
            $accesoriosMateriales = Accesorio::get();
        }
        return response()->json($accesoriosMateriales);
    }

    public function show(){
    	$data['clientes'] = Cliente::All();
        $data['materiales'] = Material::All();
        $data['materialesClientes'] = MaterialCliente::All();
		return view('materialesClientes.show')->with($data);
	}


	public function insertForm(Request $request)
	{
		$materialCliente = [
            'material_id' => $request->material_id,
            'cliente_id' => $request->cliente_id,
            'numero_parte' => $request->numero_parte,
            'almacen' => $request->almacen,
            'locacion_almacen' => $request->locacion_almacen,
            'catalogo' => $request->catalogo,
        ];
        
        //Si es editar
        if($request->id != 0){
            $materialCliente += ['id' => $request->id];
            $save = MaterialCliente::find($request->id)->update($materialCliente);
            //Fin
        }else{
            //Si es Agregar
            $save = MaterialCliente::create($materialCliente);    
        }
        //consultamos todos los materialesClientes
        $MaterialesClientes = MaterialCliente::with(['Cliente','Material','Accesorio','Material.Tipo_material'])->get();
        return response()->json($MaterialesClientes); //Fin
	}


}
