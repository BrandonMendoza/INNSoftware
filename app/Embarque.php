<?php

namespace App;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Model;


class Embarque extends Model
{
    protected $table = 'embarques'; 
    protected $fillable = [
        'id',
        'precio_total',
        'numero_tarimas',
        'fecha_salida',
        'peso_total',
        'created_at',
        'updated_at',
        'cantidad_bultos',
        'compania_transporte',
        'nombre_chofer',
        'placas_transporte',
        'cliente_id',
        'numero_parte' 
    ];

    public function Cliente()
    {
        return $this->hasOne('App\Cliente','id','cliente_id');
    }

    public function Documentos(){
	    return $this->belongsToMany('App\Documento', 'embarque_documento','embarque_id', 'documento_id')->withTimestamps();
	}

    public function ProyectosProductos(){
        return $this->belongsToMany('App\ProyectoProducto', 'embarque_proyecto_producto','embarque_id', 'proyecto_producto_id')
                    ->withTimestamps();
    }

    public function getProyectosProductosIdsAttribute()
    {
        return $this->ProyectosProductos()->select('proyecto_producto.id')->get()->pluck('id')->toArray();
    }

    public static function getEmbarquesList($keyword,$id){
        //$embarqueQuery->orderBy('fecha_salida', 'desc')->with('ProyectosProductos.Producto','Cliente','Documentos.Documento_tipo','Documentos.Usuario')->paginate($limit)
        $embarques = Embarque::orderBy('fecha_salida','DESC')
                                ->with('ProyectosProductos.Producto',
                                        'Cliente',
                                        'Documentos.Documento_tipo',
                                        'Documentos.Usuario')
                                ->get();

         if (!empty($id) && $id != 0 ) {
            $embarques = $embarques->where('id',$id);                
        }  

        // if (!empty($keyword)) {
        //     $embarques = $embarques->where('ProyectosProductos.Producto.numero_parte_cliente', 'LIKE', '%' . $keyword . '%');
        //     //$embarqueQuery->where('numero_tarimas', 'LIKE', '%' . $keyword . '%');
        // }

        return $embarques;            
    }


    public function storeProyectosProductos($proyectosProductosNews){
        //verificamos si se quitaron ordenes de el embarque y actualizamos su estatus
        foreach ($this->getProyectosProductosIdsAttribute() as $key => $proyectoProductoOld) {
            if(!in_array($proyectoProductoOld, $proyectosProductosNews)){
                $proyectoProductoDesembarcar = ProyectoProducto::find($proyectoProductoOld);
                $proyectoProductoDesembarcar->embarcado = 0;
                $proyectoProductoDesembarcar->save();
            }
        }
        //marcamos como embarcados las ordenes agregadas
        ProyectoProducto::whereIn('id', $proyectosProductosNews)->update(['embarcado' => 1,
                                                                            'embarcado_el'=> Carbon::now()->toDateTimeString()]);

        $this->ProyectosProductos()->sync($proyectosProductosNews);
    }
}
