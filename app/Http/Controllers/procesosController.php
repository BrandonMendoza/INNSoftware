<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Proceso;

class procesosController extends Controller
{   
    public function procesos(){
        return  Proceso::orderBy('orden', 'ASC')->get();
    }

    public function procesosOrder(){
        return Proceso::where([['activo','=','1'],['es_estatico','=','0']])->orderBy('orden', 'ASC')->get();
    }

    public function cargarTablaProcesos(){
        $procesos = Proceso::get();
        return response()->json($procesos);
    }

    public function cargarTablaPorcentajes(){
        $procesos = Proceso::orderBy('orden', 'ASC')->where([['activo','=','1'],['es_estatico','=','0']])->get();
        return response()->json($procesos);
    }

    public function updatePorcentaje(Request $request){
        $procesos = $request->get('procesos');
        $count = count(collect($request)->get('procesos'));

        for ($i=0; $i < $count; $i++) {
            $proceso = Proceso::find($procesos[$i]['id']);
            $proceso->porcentaje = $procesos[$i]['porcentaje'];
            $proceso->update();
        }
    }

    public function updateOrder(Request $request){
        $procesos = $request->get('procesos');
        $count = count(collect($request)->get('procesos'));

        for ($i=0; $i < $count; $i++) {
            $proceso = Proceso::find($procesos[$i]['id']);
            $proceso->orden = $procesos[$i]['orden'];
            $proceso->update();
        }
    }

	public function delete(){
        $proceso = Proceso::find(request()->get('id'));
        $procesos = Proceso::where([['activo','=','1'],['es_estatico','=','0']])->orderBy('orden', 'DESC')->get();
        //Actualizamos el orden de todos los procesos
        if($proceso->activo == 1){
            foreach ($procesos as $id => $procesoLoop) {
                if($procesoLoop->orden == $proceso->orden){
                    break;
                }
                $procesoLoop->orden--;
                $procesoLoop->update();
                
            }
            if($proceso->porcentaje > 0 && $procesos->count() > 1){
                $randomProceso = Proceso::where([['activo','=','1'],['es_estatico','=','0']])->orderBy('orden', 'DESC')->first();
                $randomProceso->porcentaje += $proceso->porcentaje;
                $randomProceso->update();
    
            }
        }
        //borramos el proceso
        $proceso->delete();
    }
    

	public function insert()
    {
        /*Funcion para insertar o Actualizar un proyecto*/
        $proceso = new Proceso;
       
        if(request()->get('id') == 0){//Si es agregar
            if(request()->get('activo') == 1){//si es activo
                $ultimoProceso = Proceso::orderBy('orden', 'DESC')->first();//buscamos el ultimo orden
                //y se lo agregamos al request para que el nuevo proceso sea el ultimo
                request()->merge(['orden' => $ultimoProceso->orden+1]);
            }else{ //si es inactvio
                //como esta insertando algo in activo debe de llevar un orden = 0
                request()->merge(['orden' => 0]);
            }
        }
        
        /*Aqui se actualiza/crea con la informacion que enviamos al request*/
        $proceso = $proceso   ->fill(request()->except('activo'))
                                 ->updateOrCreate(['id' => request()->get('id')],$proceso->toArray());

        //si es editar se activa o desactiva y se acomoda el orden
        if(request()->get('id') != 0){
            //return request()->get('activo').' - '.request()->get('id');
            return $this->activarDesactivar(request()->get('activo'),request()->get('id')); 
        }
    }

     /*Funcion para activar y desactivar proceso em base de datos*/
     public function activarDesactivar($activo,$idProceso){
        
        $proceso = Proceso::find($idProceso);
        
        $procesos = Proceso::   where([['activo','=','1'],['es_estatico','=','0']])->
                                orderBy('orden', 'DESC')->
                                get();
        //activar
        if($activo == 1 && $proceso->activo == 0){
            $ultimoProceso = Proceso::where('es_estatico',0)->orderBy('orden', 'DESC')->first();

            $proceso->orden = ($ultimoProceso->orden+1);
            $proceso->activo = 1;
            $proceso->porcentaje = 0;
            if($procesos->count() == 0){
                $proceso->porcentaje = 100;
            }
            $proceso->update();//Fin
        }
        //desactivar
        //si el proceso estaba activo y se desactiva
        elseif ($activo == 0 && $proceso->activo == 1) {
            //acomodamos el orden de los procesos
            foreach ($procesos as $id => $procesoLoop) {
                $procesoLoop->orden--;
                $procesoLoop->update();
                if($procesoLoop->id == $proceso->id){
                    break;
                }
            }
            $auxPorcentaje = $proceso->porcentaje;
            $proceso->orden = 0;
            $proceso->activo = 0;
            $proceso->porcentaje = 0;
            $proceso->update();//Fin


            $procesos = Proceso::   where([['activo','=','1'],['es_estatico','=','0']])->
                                    orderBy('orden', 'DESC')->
                                    get();
            $ultimoProceso = $procesos->first();
            //pasamos el porcentaje a otro proceso
            if($auxPorcentaje > 0 && $procesos->count() > 0){
                $ultimoProceso->porcentaje += $auxPorcentaje;
                $ultimoProceso->update();
            }

        }   
    }
}
