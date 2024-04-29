<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vinculacion; 
use Illuminate\Support\Facades\Hash;

class VinculacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vinculacion = Vinculacion::find($id);
        if ($vinculacion) {
            return $vinculacion;
        } else {
            return response()->json(['error' => 'Usuario not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function register(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        try {
            $vinculacion = Vinculacion::where('codigo', $request->id)->firstOrFail();

            $vinculacion->correo = $request->correo;
            $vinculacion-> nombre = $request->nombre;
            $vinculacion-> apellido_paterno = $request-> apellido_paterno;
            $vinculacion-> apellido_materno = $request->apellido_materno;
            $vinculacion-> linkedin = $request-> linkedin;
            $vinculacion-> telefono = $request-> telefono;
            $vinculacion-> foto_perfil = $request-> foto_perfil;
            $hash = Hash::make($request->input('password'));
            $vinculacion-> password = $hash;
            $vinculacion -> color = rand(0, 19);
            $vinculacion -> codigo = "";

            $vinculacion->save();
            return response()->json(['message' => 'Usuario Registrado correctamente']);
        } catch (\Exception $e) {
            // Manejar cualquier error, por ejemplo, el registro no encontrado
            return response()->json(['error' => 'No se pudo registrar'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
