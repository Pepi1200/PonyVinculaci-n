<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ImagesController;
use App\Http\Controllers\Api\NoticesController;
use App\Http\Controllers\Api\VideosController;
use App\Http\Controllers\Api\EmpresasController;
use App\Http\Controllers\Api\MotivoRechazoController;
use App\Http\Controllers\Api\AlumnoController;
use App\Http\Controllers\Api\VacanteController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ReportesEgresadosController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarreraController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('with_fast_api_key')->group(function () {
    Route::controller(ImagesController::class)->group(function (){
        Route::get('/images/{page}','index');
        Route::get('/getAllImages','getAll');
        Route::post('/image','store');
        Route::get('/image/{id_image}','show');
        Route::put('/image/{id_image}','update');
        Route::put('/orderImages','orderImages');
        Route::delete('/image/{id_image}','destroy');

    });

    Route::controller(NoticesController::class)->group(function (){
        Route::get('/notices','index');
        Route::post('/notice','store');
        Route::get('/notice/{id}','show');
        Route::put('/notice/{id}','update');
        Route::delete('/notice/{id}','destroy');
    });
    
    Route::controller(VideosController::class)->group(function (){
        Route::get('/videos','index');
        Route::post('/video','store');
        Route::get('/video/{id}','show');
        Route::put('/video/{id}','update');
        Route::delete('/video/{id}','destroy');
    });
    
    Route::controller(EmpresasController::class)->group(function (){
        Route::get('/empresas','index');
        Route::get('/adminEmpresas','adminEmpresas');
        Route::post('/empresa','store');
        Route::get('/empresa/{id}','show');
        Route::get('/status/empresa','status');
        Route::put('/empresa/{id}','update');
        Route::delete('/empresa/{id}','destroy');
    });

    Route::controller(MotivoRechazoController::class)->group(function (){
        Route::get('/MotivoRechazo','index');
        Route::post('/MotivoRechazo','store');
        Route::get('/MotivoRechazo/{folio}','show');
        Route::delete('/MotivoRechazo/{folio}','destroy');
    });

    Route::controller(AlumnoController::class)->group(function (){
        Route::get('/alumnos','index');
        Route::post('/alumno','store');
        Route::get('/alumno/{numero_control}','show');
        Route::put('/alumno/{id}','update');
        Route::delete('/alumno/{id}','destroy');
    });
    
    Route::controller(VacanteController::class)->group(function (){
        Route::get('/vacantes','showFilteredVacantes');
        Route::get('/bolsa','bolsa');
        Route::post('/vacante','store');
        Route::get('/vacante/{id}','show');
        Route::put('/vacante/{id}','update');
        Route::delete('/vacante/{id}','destroy');
        Route::get('/vacantes/visibility/{id}','visibility');
        Route::get('/vacantes/acepted/{id}','acepted');
    });
    
    Route::controller(ChatController::class)->group(function (){
        Route::get('/chat','response');
    });
    
    Route::controller(ReportesEgresadosController::class)->group(function (){
        Route::get('/reportes/egresados','index');
    });

    Route::controller(AuthController::class)->group(function (){
        Route::post('/register','register');
        Route::post('/login','login');
        Route::post('/loginAdmin','admin');
        Route::get('/avatar','getAvatar');
        Route::put('/changePass','changePassword');
    });

    Route::controller(CarreraController::class)->group(function (){
        Route::get('/carreras/names','names');
    });
});


