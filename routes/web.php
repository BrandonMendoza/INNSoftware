<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => 'web'], function () {
    Route::get(env('LARAVUE_PATH'), 'LaravueController@index')->where('any', '.*')->name('laravue');
    
    //UploadExcel
    Route::get('uploadExcel/getData','uploadExcelController@getData');
    Route::put('/uploadExcel/insertOrdenesAbiertas','uploadExcelController@insertOrdenesAbiertas');
    Route::get('/uploadExcel/downloadPlantilla','uploadExcelController@downloadPlantilla');

    //Pinturas
    Route::get('/pinturas','pinturasController@pinturas');
    Route::put('/pinturas/insert','pinturasController@insert');
    Route::post('/pinturas/delete','pinturasController@delete');

    //ProyectoProductos
    Route::get('/proyectosProductos','proyectosProductosController@proyectosProductos');
    Route::put('/proyectosProductos/insert','proyectosProductosController@insert');
    Route::post('/proyectosProductos/delete','proyectosProductosController@delete');
        //->Cambiar Proceso 
        Route::put('/proyectosProductos/getProcesosByProducto','proyectosProductosController@getProcesosByProducto');
        Route::put('/proyectosProductos/saveProceso','proyectosProductosController@saveProceso');
            //->Historial de procesos
            Route::put('/proyectosProductos/getHistorialProcesos','proyectosProductosController@getHistorialProcesos');
    //Proyectos
    Route::get('/proyectos','proyectosController@proyectos');
    Route::put('/proyectos/insert','proyectosController@insert');
    Route::post('/proyectos/delete','proyectosController@delete');
        //->Productos -> Documentos
        Route::post('/proyectos/documentos/store','proyectosController@store');
        Route::post('/proyectos/documentos/delete','proyectosController@deleteDocumento');
        Route::get('/proyectos/downloadDocumento/{documento_id}','proyectosController@downloadDocumento');
    
    //Productos
    Route::get('/productos','productosController@productos');
    Route::put('/productos/insert','productosController@insert');
    Route::post('/productos/delete','productosController@delete');
        //->Productos -> Documentos
        Route::post('/productos/documentos/store','productosController@store');
        Route::post('/productos/documentos/delete','productosController@deleteDocumento');
        Route::get('/productos/downloadDocumento/{documento_id}','productosController@downloadDocumento');
    //InventarioMaterialesAccesorios
    Route::get('/inventariosMaterialesAccesorios','inventariosMaterialesController@inventariosMateriales');
    Route::put('/inventariosMaterialesAccesorios/insert','inventariosMaterialesController@insert');
    Route::post('/inventariosMaterialesAccesorios/delete','inventariosMaterialesController@delete');
        //->GetMaterialesAccesorios Select Box
        Route::put('/inventariosMaterialesAccesorios/getMaterialesAccesoriosByCatalogo','inventariosMaterialesController@getMaterialesAccesoriosByCatalogo');
        //->GetMaterialeCliente
        Route::put('/inventariosMaterialesAccesorios/getMaterialClienteByMaterialCliente','inventariosMaterialesController@getMaterialClienteByMaterialCliente');

    //MaterialesClientes
    Route::get('/materialesClientes','materialesClientesController@materialesClientes');
    Route::put('/materialesClientes/insert','materialesClientesController@insert');
    Route::post('/materialesClientes/delete','materialesClientesController@delete');
        //->GetMaterialesAccesorios Select Box
        Route::put('/materialesClientes/getMaterialesAccesoriosByCatalogo','materialesClientesController@getMaterialesAccesoriosByCatalogo');

    //Clientes
    Route::get('/clientes','clientesController@clientes');
    Route::put('/clientes/insert','clientesController@insert');
    Route::post('/clientes/delete','clientesController@delete');

    //Materiales
    Route::get('/materiales','materialesController@materiales');
    Route::put('/materiales/insert','materialesController@insert');
    Route::post('/materiales/delete','materialesController@delete');
        //->With Nombre Completo
        Route::get('/materialesNombreCompleto','materialesController@materialesWithNombreCompleto');
        //->Tipos de Material
        Route::get('/tiposMateriales','materialesTiposController@tiposMateriales');
        Route::put('/tiposMateriales/insert','materialesTiposController@insert');
        Route::post('/tiposMateriales/delete','materialesTiposController@delete');
        //->Aceros
        Route::get('/acerosMateriales','materialesAcerosController@tiposMateriales');
        Route::put('/acerosMateriales/insert','materialesAcerosController@insert');
        Route::post('/acerosMateriales/delete','materialesAcerosController@delete');

    //Accesorios
    Route::get('/accesorios','accesoriosController@accesorios');
    Route::put('/accesorios/insert','accesoriosController@insert');
    Route::post('/accesorios/delete','accesoriosController@delete');

    //Procesos
    Route::get('/procesos','procesosController@procesos');
    Route::put('/proceso/insert','procesosController@insert');
    Route::post('/proceso/delete','procesosController@delete');
        //->Ordenar
        Route::get('/procesos/order','procesosController@procesosOrder');
        Route::put('/procesos/updateOrder','procesosController@updateOrder');
        //->Porcentaje
        Route::put('/procesos/updatePorcentaje','procesosController@updatePorcentaje');
});
