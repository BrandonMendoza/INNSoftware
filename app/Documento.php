<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Documento extends Model
{
    protected $table = 'documentos'; 

    protected $fillable = ['id','documento_id','nombre_sistema','nombre_usuario','nombre_real','url','tipo_documento','deleted_at','created_at','updated_at'];

    public function deleteStorage(){
        //Se obtiene path
        $path = '/public/'.$this->url."/".$this->nombre_sistema;
        //Si existe se borra en el disco y en la BD
        if (Storage::disk('public')->exists($this->url.'/'.$this->nombre_sistema)) {
            Storage::delete($path);
            $this->delete();
        }
    }

    public function download()
    {
		$path = storage_path('app/'.$this->url."/".$this->nombre_sistema);
		$headers = array('Content-Type'=> 'application/'.$this->tipo_documento);
        $path = '/public/'.$this->url."/".$this->nombre_sistema;
        if (Storage::disk('public')->exists($this->url.'/'.$this->nombre_sistema)) {
            return Storage::download($path, $this->nombre_usuario, $headers);
        }
    }

    public static function store($documento,$location)
    {
        $documentoNombre = 'doc-'.date('YmdHis').'.'.$documento->clientExtension();
        Storage::disk('public')->put($location.'/'.$documentoNombre, file_get_contents($documento));
        $documento = [
            'nombre_usuario' => $documento->getClientOriginalName(),
            'nombre_real' => $documento->getClientOriginalName(),
            'nombre_sistema' => $documentoNombre,
            'tipo_documento' => $documento->getClientOriginalExtension(),
            'url'=> $location,
        ];
        return (Documento::create($documento))->id;
    }
}
