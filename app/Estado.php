<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $table = 'estados'; 

    protected $fillable = ['id','estado'];

    protected $casts = [
        'id' => 'integer',
    ];

}
