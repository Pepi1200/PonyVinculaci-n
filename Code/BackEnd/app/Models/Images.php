<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_image';
    protected $fillable = ['page', 'title', 'text', 'name', 'text', 'link', 'image','component'];
}
