<?php

namespace App;

//use App\Empleado;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empleado extends Model
{
    use SoftDeletes;

    protected $table = 'empleados'; 
    protected $fillable =   [
        'id',
        'nombre',
        'apellidos',
        'telefono_casa',
        'telefono_celular',
        'email',
        'fecha_nacimiento',
        'direccion',
        'colonia',
        'ciudad',
        'estado_id'
        ,'rfc',
        'nss',
        'numero_empleado',
        'foto_documento_id',
        'puesto_id',
        'created_at',
        'updated_at',
        'fecha_entrada',
        'curp',
        'tipo_empleado_id'];

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

    public static function getEmpleados($soloBajas){
        //$date = Carbon::today()->addYears(2);
        
        if($soloBajas == 1){
            $empleados = Empleado::  orderBy('apellidos','ASC')
                                    ->onlyTrashed()
                                    ->with(['Estado',
                                            'Puesto.Departamento'])
                                    ->get();
        }else{
            $empleados = Empleado::    orderBy('apellidos','ASC')
                                    ->with(['Estado',
                                            'Puesto.Departamento'])
                                    ->get();
        }

        // foreach ($ordenes as $key => $ordenAbierta) {
        //     $ordenAbierta->loadProceso();
        // }

        // if($mostrarTerminados == 0){
        //     $ordenes = $ordenes->where('Proceso.ProyectoProceso.es_ultimo',0);
        // }        

        return $empleados;            
    }

    //public function Foto(){
        //return $this->belongsToMany('App\Documento', 'empleado_documento','empleado_id', 'documento_id')->withTimestamps();
    //}
}
