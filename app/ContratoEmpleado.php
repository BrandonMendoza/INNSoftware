<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContratoEmpleado extends Model
{
    protected $table = 'contrato_empleado'; 
    protected $fillable =   
        ['id',
        'duracion',
        'unidad_medida',
        'sueldo',
        'bono',
        'firmado',
        'documento_firmado_id',
        'created_at',
        'updated_at',
        'inicio_contrato',
        'termino_contrato',
        'contrato_actual',
        'empleado_id'];

    public function Documento(){
        return $this->hasOne('App\Documento','id','documento_firmado_id');
    }

    public function Empleado()
    {
        return $this->hasOne('App\Empleado','id','empleado_id');
    }

    public static function getContratosByEmpleado($empleado_id = 0){
        return ContratoEmpleado::orderBy('inicio_contrato','DESC')->where('empleado_id',$empleado_id)->get();
        //$ordenes = $ordenes->where('Proceso.es_ultimo',0);
    }
}
