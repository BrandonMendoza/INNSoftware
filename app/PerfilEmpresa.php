<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PerfilEmpresa extends Model
{
    protected $table = 'perfil_empresa'; 
    protected $fillable =   
        ['id',
        'nombre_corto',
        'razon_social',
        'nombre_representante',
        'rfc',
        'direccion',
        'colonia',
        'ciudad',
        'estado_id',
        'codigo_postal',
        'telefono',
        'email',
        'logo_documento_id',
        'updated_at',
        'created_at',];

    protected $casts = [
        'id_documento_foto' => 'integer',
        'estado_id' => 'integer',
    ];

    public function Estado(){
        return $this->hasOne('App\Estado','id','estado_id');
    }

    public function Logo(){
        return $this->hasOne('App\Documento','id','logo_documento_id');
    }

}
