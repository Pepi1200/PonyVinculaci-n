<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\notices;

class noticesController extends Controller
{
    public function index()
    {
       $notices = notices::all();
        return response()->json(['images' => $notices]);
    }

    public function store(Request $request)
    {
        $request -> validate([
            'image' => 'required',
            'link' => 'url'
        ]);
        $notices = new Notices();
        $notices->link = $request->link;
        $notices->image = $request->image;

        $notices->save();
    }

    public function show(string $id)
    {
        $notice = Notices::find($id);
        return $notice;
    }

    public function update(Request $request, string $id)
    {
        $request -> validate([
            'image' => 'required',
            'link' => 'url'
        ]);
        $notice = Notices::findOrFail($request->id);
        $notice->link = $request->input('link');
        $notice->image = $request->input('image');

        // Guardar los cambios en la base de datos
        $notice->save();
        
        // Devolver una respuesta, si es necesario
        return response()->json(['message' => 'Noticia actualizada con éxito']);
    }

    public function destroy(string $id)
    {
        Notices::destroy($id);
    }
}
