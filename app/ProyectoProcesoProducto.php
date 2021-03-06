<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ProyectoProcesoProducto extends Pivot
{
    protected $table = 'proyecto_proceso_proyecto_producto'; 

    protected $fillable = ['id','proyecto_proceso_id','proyecto_producto_id','user_id','created_at','updated_at','es_ultimo','terminado_el','iniciado_el','notas'];

    protected $casts = [
        'id' => 'integer',
        'proyecto_proceso_id' => 'integer',
        'proyecto_producto_id' => 'integer',
        'es_ultimo' => 'integer',
    ];

    public function ProyectoProceso()
    {
        return $this->hasOne('App\ProyectoProceso','id','proyecto_proceso_id')->orderBy('created_at','ASC');
    }


    public function ProyectoProducto()
    {
        return $this->hasOne('App\ProyectoProducto','id','proyecto_producto_id');
    }

    

    public function getProceso(){
        return $this->ProyectoProceso()->Proceso();
    }

    public function User()
    {
        return $this->hasOne('App\User','id','user_id');
    }
}
