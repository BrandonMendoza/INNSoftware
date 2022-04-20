<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Categoria;

class Accesorio extends Model
{
    protected $table = 'accesorios'; 

    protected $fillable = ['id','acero_id','numero_parte','descripcion','peso_kg','catalogo','created_at','updated_at','deleted_at'];

    public function Acero()
    {
        return $this->hasOne('App\MaterialAcero','id','acero_id');
    }

    public function Productos(){
        return $this->belongsToMany('App\Producto', 'productos_accesorios', 'accesorio_id','producto_id')->withPivot('cantidad');
    }

    public function Categorias(){
		return $this->belongsToMany('App\Categoria', 'accesorio_categoria','accesorio_id', 'categoria_id')->withTimestamps();
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
}
