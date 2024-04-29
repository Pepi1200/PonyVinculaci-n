<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{
    public function response(Request $request)
    {
        $pregunta = $request->input('pregunta');
        
        $resultados = Chat::selectRaw("*, 
                        MATCH(pregunta) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance", [$pregunta])
                        ->whereRaw("MATCH(pregunta) AGAINST(? IN NATURAL LANGUAGE MODE)", [$pregunta])
                        ->orderByDesc('relevance')
                        ->get();

        // Obtener la máxima relevancia (si hay resultados)
        $maxRelevancia = $resultados->first() ? $resultados->first()->relevance : null;

        // Filtrar las respuestas para obtener solo aquellas con la máxima relevancia
        $respuestasFiltradas = $resultados->filter(function ($resultado) use ($maxRelevancia) {
            return $resultado->relevance === $maxRelevancia;
        });

        // Retornar los resultados solo si hay una única respuesta con la máxima relevancia
        if ($respuestasFiltradas->count() === 1) {
            return $respuestasFiltradas;
        } else {
            $chat = new Chat();
            $chat -> pregunta = $pregunta;
            $chat -> save();
            return response()->json(['mensaje' => 'No se encontró una respuesta única con la máxima relevancia.']);
        }
    }

    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
