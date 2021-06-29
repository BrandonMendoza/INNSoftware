<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HistorialAltaBajaEmpleado extends Model
{
    protected $table = 'historial_alta_baja_empleado'; 
    protected $fillable =   
        ['id',
        'empleado_id',
        'tipo', //ALTA O BAJA
        'created_at',
        'updated_at',
        'motivo',
        'notas',];


    public function Empleado()
    {
        return $this->hasOne('App\Empleado','id','empleado_id');
    }

    public static function getHistorialByEmpleado($empleado_id = 0){
        return HistorialAltaBajaEmpleado::orderBy('created_at','DESC')->where('empleado_id',$empleado_id)->get();
    }
}
