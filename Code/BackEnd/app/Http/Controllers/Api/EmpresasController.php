<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresas; 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

class EmpresasController extends Controller
{
    public function index()
    {
        $empresas = Empresas::all();
    
        $empresas->transform(function ($empresa) {
            $empresa->logo = base64_encode($empresa->logo);
            return $empresa;
        });
    
        return $empresas;
    }
    
    public function store(Request $request)
    {
        $empresa = new Empresas();

        $latestFolio = Empresas::latest('folio')->first();
        $currentYear = now()->year;
        $sequentialNumber = ($latestFolio) ? (int)substr($latestFolio->folio, -6) + 1 : 1;
        $folio = $currentYear . str_pad($sequentialNumber, 6, '0', STR_PAD_LEFT);
        $empresa -> folio = $folio;

        $empresa -> rfc = $request -> rfc;
        $empresa -> nombre_comercial = $request -> nombre_comercial;
        $empresa -> razon_social = $request -> razon_social;
        $empresa -> tipo_empresa = $request -> tipo_empresa;
        $empresa -> sector = $request -> sector;
        $empresa -> giro = $request -> giro;
        $empresa -> numero_empleados = $request -> numero_empleados;
        $empresa -> direccion = $request -> direccion;
        $empresa -> descripcion = $request -> descripcion;
        $empresa -> sitio_web = $request -> sitio_web;
        $empresa -> nombre_encargado = $request -> nombre_encargado;
        $empresa -> puesto_encargado = $request -> puesto_encargado;
        $empresa -> telefono = $request -> telefono;
        $empresa -> correo = $request -> correo;
        $empresa -> logo = $request -> logo;

        $hash = Hash::make($request->input('password'));
        $empresa -> password = $hash;

        $empresa -> status = $request -> status;
        $empresa -> color = rand(0, 19);

        $empresa -> save();
        return response()->json(['message' => 'Registro de empresa exitoso.', 'folio'=>$folio], 200);
    }

    public function show(string $id)
    {
        $empresa = Empresas::find($id);

        if ($empresa) {
            // Convert the 'logo' field to base64 before returning
            $empresa->logo = base64_encode($empresa->logo);
            return $empresa;
        } else {
            // Handle the case where the empresa with the given ID is not found
            return response()->json(['error' => 'Empresa not found'], 404);
        }
    }

    public function status(Request $request)
    {
        // Obtén el folio encriptado de la solicitud
        $folioEncriptado = $request->input('folio');
        
        // Desencripta el folio
        $folio = Crypt::decryptString($folioEncriptado);

        // Busca la empresa por el folio desencriptado
        $empresa = Empresas::where('folio', $folio)->first();
    
        if ($empresa) {
            return response()->json(['status' => $empresa->status]);
        } else {
            // Handle the case where the empresa with the given folio is not found
            return response()->json(['error' => $folioEncriptado], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        $empresa = Empresas::findOrFail($id);

        // Update only the parameters that are present in the request
        $empresa->update($request->all());

        return response()->json(['message' => 'Empresa updated successfully', 'data' => $empresa]);
    }

    public function destroy(string $id)
    {
        $empresa = Empresas::destroy($id);
        return $empresa; 
    }

    public function adminEmpresas(Request $request)
    {
        $status = $request->status;
        
        // Especifica la cantidad de elementos por página (puedes ajustar este número según tus necesidades)
        $perPage = 10;

        // Realiza la consulta utilizando el método paginate para habilitar la paginación
        $empresas = Empresas::where('status', $status)->paginate($perPage);

        return $empresas;
    }

}
