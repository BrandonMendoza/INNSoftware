<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pintura extends Model
{
    protected $table = 'pinturas'; 

    protected $fillable = ['id','nombre','simbolo','numero_capas','tiempo_secado_capa','indicaciones'];
}
