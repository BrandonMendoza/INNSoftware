<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Puesto extends Model
{
    protected $table = 'puestos'; 
    protected $fillable = ['id','nombre','simbolo','descripcion','created_at','updated_at','departamento_id'];

    public function Departamento(){
        return $this->hasOne('App\Departamento','id','departamento_id');
    }
}
