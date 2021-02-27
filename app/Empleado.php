<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $table = 'empleados'; 
    protected $fillable =   ['id','nombre','apellidos','telefono_casa','telefono_celular','email','fecha_nacimiento','direccion','colonia','ciudad','estado_id'
                            ,'rfc','nss','numero_empleado','foto_documento_id','puesto_id','created_at','updated_at','fecha_entrada','curp'];

    protected $casts = [
        'id' => 'integer',
        'puesto_id' => 'integer',
        'foto_documento_id' => 'integer',
        'estado_id' => 'integer',
    ];

    public function Documentos(){
        return $this->belongsToMany('App\Documento', 'empleado_documento','empleado_id', 'foto_documento_id')->withTimestamps();
    }

    public function Foto()
    {
        return $this->hasOne('App\empleado_documento','id','foto_documento_id');
    }

    public function Estado(){
        return $this->hasOne('App\Estado','id','estado_id');
    }

    public function Puesto(){
        return $this->hasOne('App\Puesto','id','puesto_id');
    }

    

    //public function Foto(){
        //return $this->belongsToMany('App\Documento', 'empleado_documento','empleado_id', 'documento_id')->withTimestamps();
    //}
}
