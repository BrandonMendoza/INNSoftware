<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $table = 'departamentos'; 
    protected $fillable = ['id','nombre','simbolo','descripcion','created_at','updated_at'];

    // public function Puestos(){
	//     return $this->belongsToMany('App\Puesto', 'departamento_puesto','departamento_id', 'puesto_id')->withTimestamps();
    // }
}
