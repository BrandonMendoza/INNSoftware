<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaterialCliente extends Model
{
    protected $table = 'material_cliente'; 
    protected $fillable = ['id','numero_parte','catalogo','material_id','cliente_id','almacen','locacion_almacen','created_at','updated_at','deleted_at'];

    public function Material()
    {
        return $this->hasOne('App\Material','id','material_id');
    }

    public function Accesorio()
    {
        return $this->hasOne('App\Accesorio','id','material_id');
    }

    public function Cliente()
    {
        return $this->hasOne('App\Cliente','id','cliente_id');
    }

    public function getNombreMaterialAccesorio()
    {
        if($this->catalogo == 1){
            $nombre = $this->Material->getNombreMaterial();
        }else{
            $nombre = $this->Accesorio->descripcion;
        }
        return $nombre;
    }

    /** Funcion para cargar el nombre de acuerdo a que si es material o accesorio */
    public function loadNombreMaterialAccesorio(){
        if($this->catalogo == 1){
            $nombre = $this->Material->getNombreMaterial();
        }else{
            $nombre = $this->Accesorio->descripcion;
        }
        $this['nombre'] =  $nombre;
    }

    public function loadAcero(){
        if($this->catalogo == 1){
            $nombreAcero = $this->Material->Acero->nombre;
        }else{
            $nombreAcero = $this->Accesorio->Acero->nombre;
        }
        $this['acero'] =  $nombreAcero;
    }

    public function getAcero()
    {
        if($this->catalogo == 1){
            $nombreAcero = $this->Material->Acero->nombre;
        }else{
            $nombreAcero = $this->Accesorio->Acero->nombre;
        }
        return $nombreAcero;
    }

    public function getId()
    {
        if($this->catalogo == 1){
            $idMaterialAccesorio = $this->Material->id;
        }else{
            $idMaterialAccesorio = $this->Accesorio->id;
        }
        return $idMaterialAccesorio;
    }
    
}
