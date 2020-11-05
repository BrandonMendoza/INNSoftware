<?php

namespace App;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Carbon\Carbon;

class ProyectoProducto extends Pivot
{
	protected $table = 'proyecto_producto'; 

    protected $fillable = ['id','proyecto_id','producto_id','proceso_id','work_order','item','cantidad','heat_number','notas','hrs_labor','pintura_id','created_at','updated_at','proceso_id','numero_parte_cliente','fecha_entrega'];
    protected $dates = ['fecha_entrega'];

    protected $casts = [
        'id' => 'integer',
        'producto_id' => 'integer',
        'proceso_id' => 'integer',
        'pintura_id' => 'integer',
        'proceso_id' => 'integer',
    ];

    public static function loadOrdenesAbiertasWithAll(){
        
        $ordenesAbiertas = ProyectoProducto::
                                orderBy('fecha_entrega','DESC')
                                ->with([ 'Producto','Proyecto','Proyecto.Cliente'])
                                ->get();
        foreach ($ordenesAbiertas as $key => $ordenAbierta) {
            $ordenAbierta->loadProceso();
        }
        return $ordenesAbiertas;
    }

	public function Producto()
    {
        return $this->hasOne('App\Producto','id','producto_id');
    }



    public function Proyecto()
    {
        return $this->hasOne('App\Proyecto','id','proyecto_id');
    }

    public function ProyectoProcesoProducto(){
        return $this->belongsToMany('App\ProyectoProceso','proyecto_proceso_proyecto_producto','proyecto_producto_id')
                    ->withPivot('id','proyecto_proceso_id','proyecto_producto_id','user_id')
                    ->using('App\ProyectoProcesoProducto')
                    ->as('ProyectoProcesoProducto')
                    ->withTimestamps();
    }

    public function loadProceso(){
        $this['Proceso'] = $this->getLastProceso();
    }

    public function loadProgreso(){
        $total = 0;
        $procesosProducto = $this->getProyectoProcesoProducto;
        foreach ($procesosProducto as $key => $procesoProducto) {
            $total += $procesoProducto->proyectoProceso->porcentaje;
        }
        $total -= (float)$this->getLastProceso()->porcentaje/2;
        return $total;
    }    
    

    public function getLastProceso()
    {
        return $this->getProyectoProcesoProducto()
                    ->with('ProyectoProceso.Proceso')
                    ->orderBy('created_at','DESC')
                    ->first();
    }

    public function getLastproyectoProceso()
    {
        return ($this->getProyectoProcesoProducto()
                    ->with('ProyectoProceso.Proceso')
                    ->orderBy('created_at','DESC')
                    ->first())
                        ->proyectoProceso;
    }

    public function getProyectoProcesoProducto(){
        return $this->hasMany('App\ProyectoProcesoProducto','proyecto_producto_id','id');
    }
}
