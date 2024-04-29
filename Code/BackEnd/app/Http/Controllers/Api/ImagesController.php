<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Images; // Make sure to import the Image model
use Illuminate\Http\Request;

class ImagesController extends Controller
{
    public function index(string $page)
    {
        // Use ->get() to get all results
        $images = Images::where('page', $page)->orderBy('orden', 'ASC')->get();

        // Verifica si hay imágenes
        if ($images->isEmpty()) {
            return response()->json(['error' => 'No se encontraron imágenes para la página especificada'], 404);
        }

        // Convierte el campo de imagen a base64 para todas las imágenes
        $images->each(function ($image) {
            $image->image = $image->image;
        });

        // Devuelve las imágenes como respuesta JSON
        return response()->json(['images' => $images]);
    }

    public function getAll()
    {
        // Obtener todas las imágenes ordenadas por la columna 'order' en orden ascendente
        $images = Images::orderBy('orden', 'ASC')->get();

        // Obtener páginas únicas
        $pages = Images::distinct('page')->pluck('page')->toArray();

        return response()->json(['images' => $images, 'pages' => $pages]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'page' => 'required',
            'component' => 'required'
        ]);
        $image = new Images(); 
        $image->page = $request->page;
        $image->component = $request->component;
        $image->title = $request->title;
        $image->name = $request->name;
        $image->text = $request->text;
        $image->link = $request->link;
        $image->image = $request->image;

        $image->save();
    }

    public function show(string $id_image)
    {
        $image = Images::where('id_image', $id_image)->first();

        // Verifica si la imagen existe
        if (!$image) {
            return response()->json(['error' => 'Imagen no encontrada'], 404);
        }
        // Devuelve la imagen como respuesta JSON
        return response()->json(['image' => $image]);
    }

    public function update(Request $request, string $id_image)
    {
        $image = Images::findOrFail($id_image); // Update to use the correct model name
        $image->page = $request->page;
        $image->title = $request->title;
        $image->name = $request->name;
        $image->text = $request->text;
        $image->link = $request->link;
        $image->image = $request->image;
        $image->component = $request->component;

        $image->save();
        return $image;
    }

    public function orderImages(Request $request)
    {
        $data = $request->all();

        foreach ($data as $item) {
            $id_image = $item['id_image'];
            $orden = $item['orden'];

            $image = Images::findOrFail($id_image);
            if ($image->orden != $orden) {
                $image->orden = $orden;
                $image->save();
            }
        }

        return response()->json(['message' => 'Registros actualizados correctamente']);
    }

    public function destroy(string $id_image)
    {
        $image = Images::destroy($id_image); // Update to use the correct model name
        return $image;
    }
}
