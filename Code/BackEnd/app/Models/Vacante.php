<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Empresas; 
use App\Models\Carrera; 

class Vacante extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'Id_empresa', 'id_carrera', 'descripcion', 'fecha_cierre', 'aceptada', 'visible', 'practicas', 'laboral'];

    public function empresa()
    {
        return $this->belongsTo(Empresas::class, 'Id_empresa');
    }

    public function carreras()
    {
        return $this->belongsToMany(Carrera::class, 'carrera_vacante', 'vacante_id', 'carrera_id');
    }
}
