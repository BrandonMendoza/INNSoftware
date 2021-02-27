<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;
use Str;
use Auth;

class Documento extends Model
{
    protected $table = 'documentos'; 

    protected $fillable = ['id',
    'documento_id',
    'nombre_sistema',
    'nombre_usuario',
    'nombre_real',
    'url',
    'tipo_documento',
    'deleted_at',
    'created_at',
    'updated_at',
    'documento_tipo_id',
    'storage_path',
    'cargado_por'];

    public function deleteStorage(){
        //Se obtiene path
        $path = '/public/'.$this->url."/".$this->nombre_sistema;
        //Si existe se borra en el disco y en la BD
        if (Storage::disk('public')->exists($this->url.'/'.$this->nombre_sistema)) {
            Storage::delete($path);
            $this->delete();
        }
    }

    public function deleteFromStorage(){
        //Se obtiene path
        $path = '/public/'.$this->url."/".$this->nombre_sistema;
        //Si existe se borra en el disco y en la BD
        if (Storage::disk('public')->exists($this->url.'/'.$this->nombre_sistema)) {
            Storage::delete($path);
        }
    }

    public function Documento_tipo()
    {
        return $this->hasOne('App\DocumentoTipo','id','documento_tipo_id');
    }

    public function Usuario()
    {
        return $this->hasOne('App\User','id','cargado_por');
    }

    public function download()
    {
		$path = storage_path('app/'.$this->url."/".$this->nombre_sistema);
		$headers = array('Content-Type'=> 'application/'.$this->tipo_documento);
        $path = $this->url."/".$this->nombre_sistema;
        // URL = 'uploads/proyectos/'.$proyecto->numero_parte.'/documentos'
        if (Storage::disk('public')->exists($this->url.'/'.$this->nombre_sistema)) {
            return Storage::download('public/'.$path, $this->nombre_usuario, $headers);
        }
    }

    public static function store($documento,$location,$documento_tipo_id = null)
    {
        $documentoNombre = 'doc-'.date('YmdHis').'.'.$documento->clientExtension();
        //Storage::disk('public')->put($location.'/'.$documentoNombre, file_get_contents($documento));
        //Storage::putFile($documentoNombre, $documento);

        // 'public/uploads/proyectos/'.$proyecto->numero_parte.'/documentos'
        $path = $documento->storeAs('public/'.$location, $documentoNombre);
        $documento = [
            'nombre_usuario' => $documento->getClientOriginalName(),
            'nombre_real' => $documento->getClientOriginalName(),
            'nombre_sistema' => $documentoNombre,
            'tipo_documento' => $documento->getClientOriginalExtension(),
            'url'=> $location,
            'documento_tipo_id' =>  $documento_tipo_id,
            'storage_path' =>  'storage/'.$location,
            'cargado_por' => Auth::id(),
            //Str::of(storage_path('app/'.$path))->replace('\\', '/'),
            //C:/xampp/htdocs/laravue/storage/app/public/uploads/proyectos/PY-123/documentos/doc-20210224113642.jpeg
        ];
        return (Documento::create($documento))->id;
    }
}
