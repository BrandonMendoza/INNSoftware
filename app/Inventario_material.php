<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventario_material extends Model
{
    protected $table = 'inventario_materiales'; 

    protected $fillable = [ 'id','material_id','cliente_id','status_id','orden_compra_id','proyecto','tba','cantidad','item','plan_corte',
                            'work_order','heat_number','created_at','updated_at','recibido_el','cantidad_faltante','is_editing','catalogo','material_cliente_id'];

    public function Material()
    {
        return $this->hasOne('App\Material','id','material_id');
    }

    public function Accesorio()
    {
        return $this->hasOne('App\Accesorio','id','material_id');
    }

    public function Material_cliente()
    {
        return $this->hasOne('App\MaterialCliente','id','material_cliente_id');
    }

    public function Cliente()
    {
        return $this->hasOne('App\Cliente','id','cliente_id');
    }

    public function Status()
    {
        return $this->hasOne('App\StatusInventarioMaterial','id','status_id');
    }

    public function loadPesoMaterial(){
        if($this->catalogo == 1){
            $pesoUnitario = $this->Material->peso_kg;
            $pesoTotal =  (float)$pesoUnitario*(float)$this->cantidad;
        }else{
            $pesoUnitario = $this->Accesorio->peso_kg;
            $pesoTotal =  (float)$pesoUnitario*(float)$this->cantidad;
        }
        
        $this['pesoTotal'] =  number_format((float)$pesoTotal, 2, '.', '');
    }

    public function getPesoMaterial(){
        if($this->catalogo == 1){
            $pesoUnitario = $this->Material->peso_kg;
            $pesoTotal =  (float)$pesoUnitario*(float)$this->cantidad;
        }else{
            $pesoUnitario = $this->Accesorio->peso_kg;
            $pesoTotal =  (float)$pesoUnitario*(float)$this->cantidad;
        }
       
        return $pesoTotal;
    }

    public function loadNombreCompleto(){   
        $nombreCompleto = "";
        if($this->catalogo == 1){
            $nombreCompleto = $this->Material->getNombreMaterial();
        }else{
            $nombreCompleto = $this->Accesorio->descripcion;
        }
        $this['nombreCompleto'] = $nombreCompleto;
    }

    public function loadAcero(){   
        $acero = "";
        if($this->catalogo == 1){
            $acero = $this->Material->Acero->nombre;
        }else{
            $acero = $this->Accesorio->Acero->nombre;
        }
        $this['acero'] = $acero;
    }
    
}
