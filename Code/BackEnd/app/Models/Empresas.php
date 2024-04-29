<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Empresas extends Model
{
    use HasFactory;
    protected $fillable = [ 'rfc', 'nombre_comercial', 'razon_social', 'tipo_empresa', 'sector', 'giro', 'numero_empleados', 'direccion', 'descripcion', 'sitio_web', 'nombre_encargado', 'puesto_encargado', 'telefono', 'correo', 'logo', 'status'];
    protected $hidden = [
        'folio',
        'password',
    ];
}
