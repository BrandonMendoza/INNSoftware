<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocumentoTipo extends Model
{
    protected $table = 'documento_tipo'; 

    protected $fillable = ['id','nombre','simbolo','color','permiso'];

    protected $casts = [
        'id' => 'integer',
    ];

}
