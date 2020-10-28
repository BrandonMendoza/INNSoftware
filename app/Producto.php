<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Producto extends Model
{
    protected $table = 'productos'; 

    protected $fillable = ['id','cliente_id','numero_parte_cliente','numero_parte','descripcion','peso_kg','peso_lbs','deleted_at','created_at','updated_at','pintura_id'];

    public function Materiales(){
	    return $this->belongsToMany('App\Material', 'productos_materiales','producto_id', 'material_id')->withPivot('cantidad')->withTimestamps();
	}

	public function Accesorios(){
	    return $this->belongsToMany('App\Accesorio', 'productos_accesorios','producto_id', 'accesorio_id')->withPivot('cantidad')->withTimestamps();
	}

	public function Documentos(){
	    return $this->belongsToMany('App\Documento', 'producto_documento','producto_id', 'documento_id')->withTimestamps();
	}

	public function Cliente()
    {
        return $this->hasOne('App\Cliente','id','cliente_id');
	}
	
	public function Pintura()
    {
        return $this->hasOne('App\Pintura','id','pintura_id');
    }

    public function Proyectos(){
	    return $this->belongsToMany('App\Proyecto', 'proyecto_producto','producto_id', 'proyecto_id')->withPivot('id','cantidad','numero_parte_cliente','work_order','item','cantidad','heat_number','notas','hrs_labor','pintura_id','proceso_id')->using('App\ProyectoProducto')->withTimestamps();
	}

	/** Funcion para eliminar un producto y desvincular sus materiales, accesorios y documentos correctamente */
	public function deleteDetach(){
		/**Detach */
		$this->Materiales()->detach();
		$this->Accesorios()->detach();
		$this->deleteAllDocumentos();
		/**Delete producto*/
		$this->delete();
	}


	public function insertMateriales($materiales,$producto){
		$producto->Materiales()->detach();
		if(isset($materiales)){
			foreach ($materiales as $key => $material) {
				$this->Materiales()->attach($material['id'], ['cantidad' => $material['pivot']['cantidad']]);
			}
		}
	}

	public function insertAccesorios($accesorios,$producto){
		$producto->Accesorios()->detach();
		if(isset($accesorios)){
			foreach ($accesorios as $key => $accesorio) {
				$this->Accesorios()->attach($accesorio['id'], ['cantidad' => $accesorio['pivot']['cantidad']]);
			}
		}
	}

	public function getProgreso(){
		$totalProgreso = 0;
    	foreach ($this->Productos as $id => $producto) {
    		$totalProgreso += (float)$producto->getHrsLabor();
    	}
    	return number_format((float)$totalProgreso, 2, '.', '');
	}

	public function getHrsLabor(){
		$cadencia = 20;
		return number_format((float)$this->peso_lbs/$cadencia, 2, '.', '');
	}

	/**Funcion para eliminar todos los documentos de un producto
	 * 
	 * Se necesita haber cargado los documentos anteriormente
	 * 
	 */
	public function deleteAllDocumentos(){
		foreach ($this->documentos as $key => $documento) {
			$path = '/public/'.$documento->url."/".$documento->nombre_sistema;
			if (Storage::disk('public')->exists($documento->url.'/'.$documento->nombre_sistema)) {
				$this->Documentos()->detach($documento->id);
				$documento->delete();
				Storage::delete($path);
			}
		}
	}
}
