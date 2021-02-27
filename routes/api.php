<?php

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Laravue\Faker;
use \App\Laravue\JsonResponse;
use \App\Laravue\Acl;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(function() {
    Route::post('auth/login', 'AuthController@login');

    

    Route::group(['middleware' => 'auth:sanctum'], function () {

        // Auth routes
        Route::get('auth/user', 'AuthController@user');
        Route::post('auth/logout', 'AuthController@logout');

        Route::get('/user', function (Request $request) {
            return new UserResource($request->user());
        });

        // Api resource routes
        Route::apiResource('roles', 'RoleController')->middleware('permission:' . Acl::PERMISSION_PERMISSION_MANAGE);
        Route::apiResource('users', 'UserController')->middleware('permission:' . Acl::PERMISSION_USER_MANAGE);
        Route::apiResource('permissions', 'PermissionController')->middleware('permission:' . Acl::PERMISSION_PERMISSION_MANAGE);

        // Custom routes
        Route::put('users/{user}', 'UserController@update');
        Route::get('users/{user}/permissions', 'UserController@permissions')->middleware('permission:' . Acl::PERMISSION_PERMISSION_MANAGE);
        Route::put('users/{user}/permissions', 'UserController@updatePermissions')->middleware('permission:' .Acl::PERMISSION_PERMISSION_MANAGE);
        Route::get('roles/{role}/permissions', 'RoleController@permissions')->middleware('permission:' . Acl::PERMISSION_PERMISSION_MANAGE);

        
        

        
    });

    
    
    /*Proyectos Productos */
    Route::get('proyectosProductos/{cliente}/OrdenesTerminadasSinEmbarcar', 'proyectosProductosController@OrdenesTerminadasSinEmbarcar');
    Route::get('proyectosProductos/{cliente}/getOrdenesAbiertasByCliente', 'proyectosProductosController@getOrdenesAbiertasByCliente');
    Route::get('proyectosProductos/getOrdenesAbiertasList', 'proyectosProductosController@getOrdenesAbiertasList');
    Route::get('proyectosProductos/getDocumentosFromOrden', 'proyectosProductosController@getDocumentosFromOrden');
    Route::post('proyectosProductos/store', 'proyectosProductosController@storeProyectoProceso');
    Route::post('/proyectosProductos/deleteFromProject', 'proyectosProductosController@deleteFromProject');
    Route::post('/proyectosProductos/updateMultiplePlanCorte', 'proyectosProductosController@updateMultiplePlanCorte');
    Route::post('/proyectosProductos/deleteMultipleFromProject', 'proyectosProductosController@deleteMultipleFromProject');

    /* Productos */
    Route::get('productos/{cliente}/getProductosByCliente', 'productosController@getProductosByCliente');
});

Route::get('perfilEmpresa/getImgUrl', 'perfilEmpresaController@getImgUrl');

Route::apiResource('embarques', 'embarquesController');
Route::apiResource('proyectosProductos', 'proyectosProductosController');
Route::apiResource('empleados', 'empleadosController');
Route::apiResource('departamentos', 'departamentosController');
Route::apiResource('puestos', 'puestosController');
Route::apiResource('estados', 'estadosController');
Route::apiResource('documentoTipo', 'documentoTipoController');
Route::apiResource('perfilEmpresa', 'perfilEmpresaController');