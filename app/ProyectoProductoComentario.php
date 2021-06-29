<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProyectoProductoComentario extends Model
{
    protected $table = 'proyecto_producto_comentario'; 
    protected $primaryKey = "id";
    protected $fillable = 
    [   
        'id',
        'comentario',
        'usuario_id',
        'proyecto_producto_id',
        'proyecto_proceso_id',
        'created_at',
        'updated_at',
    ];

    public function Usuario()
    {
        return $this->hasOne('App\User','id','usuario_id');
    }

    public function ProyectoProducto()
    {
        return $this->hasOne('App\ProyectoProducto','id','proyecto_producto_id');
    }

    public function ProyectoProceso()
    {
        return $this->hasOne('App\ProyectoProceso','id','proyecto_proceso_id');
    }

    public static function getProyectoProducoComentarioByProyectoProducto($proyecto_producto_id = 0){
        return ProyectoProductoComentario::orderBy('created_at','DESC')->with('usuario','ProyectoProceso.Proceso')->where('proyecto_producto_id',$proyecto_producto_id)->get();
    }

}
