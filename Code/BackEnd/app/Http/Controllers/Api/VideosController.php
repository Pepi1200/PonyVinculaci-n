<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Videos;

class VideosController extends Controller
{
    public function index()
    {
        $videos = Videos::all();
        return $videos;
    }

    public function store(Request $request)
    {
        dd($request->all());
        $request->validate([
            'video' => 'required|mimes:mp4,mov,avi|max:10240', // Ajusta las extensiones y el tamaño según tus necesidades
        ]);

        // Guarda el video en el sistema de archivos local (carpeta public/videos)
        $videoPath = $request->file('video')->store('videos', 'public');

        // Guarda los detalles del video en la base de datos
        $video = new Video();
        $video->route = $videoPath;
        $video->save();

        return response()->json(['message' => 'Video subido correctamente'], 201);
    }


    public function show(string $id)
    {
        $videos = Videos::find($id);
        return $videos;
    }

    public function update(Request $request, string $id)
    {
        $video = Videos::findOrFail($id);
        $video -> route = $request -> route;
        $video->save();

        return $videos;
    }

    public function destroy(string $id)
    {
        $video = Videos::destroy($id);
        return $video;
    }
}
