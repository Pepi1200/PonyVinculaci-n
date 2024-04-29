<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alumno; 
use Illuminate\Support\Facades\Hash;

class AlumnoController extends Controller
{
    public function index()
    {
        $alumnos = Alumno::all();
    
        $alumnos->transform(function ($alumno) {
            $alumno->logo = base64_encode($alumno->logo);
            return $alumno;
        });
    
        return $alumnos;
    }

    public function store(Request $request)
    {
        $request->validate([
            'numero_control' => 'required|unique:alumnos,numero_control',
            'correo' => 'email',
        ]);

        $alumno = new Alumno();

        $alumno-> numero_control=$request -> numero_control;
        $alumno -> correo = $request -> correo;
        $alumno -> nombre = $request ->nombre;
        $alumno -> apellido_paterno = $request -> apellido_paterno;
        $alumno -> apellido_materno = $request -> apellido_materno;
        $alumno -> linkedin = $request -> linkedin;
        $alumno -> telefono = $request -> telefono;
        $alumno -> foto_perfil = $request -> foto_perfil;

        $hash = Hash::make($request->input('password'));
        $alumno -> password = $hash;

        $alumno -> color = rand(0, 19);

        $alumno -> save();
        return response()->json(['message' => 'Registro de alumno exitoso.'], 200);
    }

    public function show(string $id)
    {
        $alumno = Alumno::find($id);
        if ($alumno) {
            return $alumno;
        } else {
            return response()->json(['error' => 'Alumno not found'], 404);
        }
    }

    public function showByControlNumber($numero_control)
    {
        $alumno = Alumno::where('numero_control', $numero_control)->first();
        return $alumno;
    }

    public function update(Request $request, string $id) //todo
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) //todo
    {
        //
    }
}
