<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;
use App\Categoria;

class Producto extends Model
{
    protected $table = 'productos'; 

    protected $fillable = ['id',
							'cliente_id',
							'numero_parte_cliente',
							'numero_parte',
							'descripcion',
							'peso_kg',
							'peso_lbs',
							'deleted_at',
							'created_at',
							'updated_at',
							'pintura_id',
							'nombre_producto'];

	public function Categorias(){
		return $this->belongsToMany('App\Categoria', 'producto_categoria','producto_id', 'categoria_id')->withTimestamps();
	}

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
		$this->Categorias()->detach();
		$this->deleteAllDocumentos();
		/**Delete producto*/
		$this->delete();
	}

	public static function getProductosByCliente($cliente_id = 0){
		$productos = Producto::orderBy('id','DESC')->get();

		if ($cliente_id != 0) {
            $productos = $productos->where('cliente_id', $cliente_id);
		}
		return $productos;
	}

	public function insertCategorias($categorias){
		$this->Categorias()->detach();
		//return $categorias;
		if(isset($categorias)){
			//return $categorias;
			foreach ($categorias as $key => $categoria) {
				
				if(isset($categoria['id'])){
					$this->Categorias()->attach($categoria['id']);
				}else{
					if (Categoria::where('categoria', $categoria )->doesntExist()) {
						$categoria_insert = new Categoria;
						$categoria_insert->categoria = strtoupper($categoria);
						$categoria_insert->save();
						$this->Categorias()->attach($categoria_insert->id);
					}
					
				}
			}
			// $categorias_list = Categoria::get();
			// return $categorias_list;
		}
	}

	public function insertMateriales($materiales){
		$this->Materiales()->detach();
		if(isset($materiales)){
			foreach ($materiales as $key => $material) {
				$this->Materiales()->attach($material['id'], ['cantidad' => $material['pivot']['cantidad']]);
			}
		}
	}

	public function insertAccesorios($accesorios){
		$this->Accesorios()->detach();
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
