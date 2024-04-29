<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Carrera; 

class ReportesEgresados extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'ubicacion', 'id_carrera'];

    public function carreras()
    {
        return $this->belongsTo(Carrera::class, 'id_carrera');
    }
}
