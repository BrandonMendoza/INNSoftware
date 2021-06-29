<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BajaEmpleado extends Model
{
    protected $table = 'baja_empleado'; 
    protected $fillable =   
        ['id',
        'fecha_baja',
        'fecha_inicial_labores',
        'tipo_baja_id',
        'dias_laborados',
        'vacaciones',
        'prima_vacacional',
        'aguinaldo',
        'firmado',
        'created_at',
        'updated_at',
        'empleado_id',
        'salario_diario',
        'salario',
    ];

    public function Empleado()
    {
        return $this->hasOne('App\Empleado','id','empleado_id');
    }
    public static function getBajasbyEmpleado($empleado_id = 0){
        return BajaEmpleado::orderBy('created_at','DESC')->where('empleado_id',$empleado_id)->get();
    }
}
