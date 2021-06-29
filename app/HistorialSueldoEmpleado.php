<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HistorialSueldoEmpleado extends Model
{
    protected $table = 'historial_sueldo_empleado'; 
    protected $fillable =   
        ['id',
        'empleado_id',
        'sueldo',
        'bono',
        'created_at',
        'updated_at',
    ];

    public function Empleado()
    {
        return $this->hasOne('App\Empleado','id','empleado_id');
    }

    public static function getHistorialSueldoByEmpleado($empleado_id = 0){
        return HistorialSueldoEmpleado::orderBy('created_at','DESC')->where('empleado_id',$empleado_id)->get();
    }
}
