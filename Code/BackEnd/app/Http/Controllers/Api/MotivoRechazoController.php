<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MotivoRechazo;
use Illuminate\Http\Response; 
use App\Models\Empresas; 
use Illuminate\Support\Facades\Crypt;

class MotivoRechazoController extends Controller
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
        $request -> validate([
            'id_empresa' => 'required',
            'motivo' => 'required'
        ]);
        $empresa = Empresas::find($request->id_empresa);

        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }
    
        $motivo = new MotivoRechazo();
        $motivo->folio_empresa = $empresa->folio; 
        $motivo->motivo = $request->motivo;
    
        $motivo->save();
        return response([],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $folioCifrado)
    {
        $folio = Crypt::decryptString($folioCifrado);
        // Buscar el motivo por su folio
        $motivo = MotivoRechazo::where('folio_empresa', $folio)->first();

        // Verificar si el motivo existe
        if ($motivo) {
            return response()->json($motivo->motivo, Response::HTTP_OK);
        } else {
            // El motivo no existe, responder con un error
            return response()->json(['error' => 'El motivo no existe'], Response::HTTP_NOT_FOUND);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $empresa = Empresas::find($id);
        // Buscar el motivo por su ID
        $motivo = MotivoRechazo::where('folio_empresa', $empresa->folio)->first();

        // Verificar si el motivo existe
        if ($motivo) {
            // Eliminar el motivo
            $motivo->delete();

            return response()->json(['message' => 'Motivo eliminado correctamente'], Response::HTTP_OK);
        } else {
            // El motivo no existe, responder con un error
            return;
        }
    }
}
