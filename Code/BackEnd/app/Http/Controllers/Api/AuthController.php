<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\EmpresasController;
use App\Http\Controllers\Api\AlumnoController;
use App\Http\Controllers\Api\VinculacionController;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use App\Models\Empresas;
use App\Models\Alumno;
use App\Models\Vinculacion;


class AuthController extends Controller
{
    public function register(Request $request){
        $tipoUsuario = $request->input('tipoUsuario');

        if($tipoUsuario == 'empresa'){
            $request->validate([
                'rfc' => ['regex:/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z\d]{3})$/', 'required', 'unique:empresas'],
                'nombre_comercial' => 'required',
                'razon_social' => 'required',
                'correo' => 'required|email',
                'password' => 'required|confirmed'
            ]);

            $empresasController = new EmpresasController;
            $response = $empresasController->store($request);
            return response()->json(['message' => 'Registro de empresa exitoso.', 'data' => $response], 200);
        }
        elseif($tipoUsuario == 'alumno'){
            $request->validate([
                'numero_control' => ['regex: /[A-Z]?\d{8}$/', 'required', 'unique:alumnos'],
                'correo' => 'email',
                'password' => 'required|confirmed'
            ]);

            $alumnoController = new AlumnoController;
            $response = $alumnoController->store($request);
            return response()->json(['message' => 'Registro de alumno exitoso.', 'data' => $response], 200);
        }
        elseif($tipoUsuario == 'vinculacion'){
            $request->validate([
                'correo' => 'email',
                'password' => 'required|confirmed',
                'id'=> 'required',
            ]);

            $vinculacionController = new VinculacionController;
            $response = $vinculacionController->register($request);
            return response()->json(['message' => $request, 'data' => $response], 200);
        }
        else{
            return response()->json(['error' => 'Tipo de usuario no válido'], 400);
        }
        
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'user' => 'required',
            'password' => 'required'
        ]);
    
        $user = $request -> user;
        $password = $request -> password;

        if(Auth::guard('empresas')->attempt(['folio' => $user, 'password' => $password])){
            $empresasController = new EmpresasController;

            $user = $empresasController->show(Auth::guard('empresas')->id());

            return response()->json(["Token" =>  Crypt::encryptString($user->folio), "User" =>'ng9dRIbzdNeWzRr0KRH+Mw==']);
        }
        elseif(Auth::guard('alumnos')->attempt(['numero_control' => $user, 'password' => $password])){
            $alumnoController = new AlumnoController;

            $user = $alumnoController->show(Auth::guard('alumnos')->id());

            return response()->json(["Token" =>  Crypt::encryptString($user->numero_control), "User" =>'JINl1DY1oKnR8hkmGic7og==']);
        }
        elseif(Auth::guard('vinculacion')->attempt(['correo' => $user, 'password' => $password])){
            $vinculacionController = new VinculacionController;

            $user = $vinculacionController->show(Auth::guard('vinculacion')->id());

            return response()->json(["Token" =>  Crypt::encryptString($user->correo), "User" =>'aFjWXkppCEDFUBB0q2zZlA==']);
        }
        else{
            return response(["message" => "Usuario o contraseña incorrectos."], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function admin(Request $request){
        $credentials = $request->validate([
            'user' => 'required',
            'password' => 'required'
        ]);
    
        $user = $request -> user;
        $password = $request -> password;

        if(Auth::guard('vinculacion')->attempt(['correo' => Crypt::decryptString($user), 'password' => $password])){
            $vinculacionController = new VinculacionController;

            $user = $vinculacionController->show(Auth::guard('vinculacion')->id());

            return response([],200);
        }
        else{
            return response(["message" => "Usuario o contraseña incorrectos."], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function userProfile(Request $request){
        
    }

    public function getAvatar(Request $request){
        $user = $request -> user;
        if($user == "ng9dRIbzdNeWzRr0KRH+Mw=="){
            $empresa = Empresas::where('folio', Crypt::decryptString($request -> token))->first();
            return response(['image' => $empresa->logo, "nombre" => $empresa-> nombre_comercial, "colorNumber"=> $empresa->color], 200);    
        }elseif($user == "JINl1DY1oKnR8hkmGic7og=="){
            $alumno = Alumno::where('numero_control', Crypt::decryptString($request -> token))->first();
            return response(['image' => $alumno->foto_perfil, "nombre" => ($alumno->nombre . ' ' . $alumno->apellido_paterno . ' ' . $alumno->apellido_materno), "colorNumber"=> $alumno->color], 200);
        }elseif($user == "aFjWXkppCEDFUBB0q2zZlA=="){
            $vinculacion = Vinculacion::where('correo', Crypt::decryptString($request -> token))->first();
            return response(['image' => $vinculacion->foto_perfil, "nombre" => ($vinculacion->nombre . ' ' . $vinculacion->apellido_paterno . ' ' . $vinculacion->apellido_materno), "colorNumber"=> $vinculacion->color], 200);
        }
        return response(["message" => "Avatar no encontrado"], 404);
    }

    public function changePassword(Request $request){
        $request->validate([
            'user' => 'required',
            'password' => 'required | confirmed'
        ]);
        
        // Obtener datos del usuario y la nueva contraseña de la solicitud
        $userIdentifier = $request->input('user'); // Esto debe ser proporcionado en tu solicitud
        $newPassword = $request->input('password');

        // Determinar el tipo de usuario basado en la solicitud o tu lógica
        $userType = $this->determinarTipoUsuario($userIdentifier);

        // Actualizar la contraseña en la tabla correspondiente
        switch ($userType) {
            case 'alumno':
                Alumno::where('numero_control', $userIdentifier)
                    ->update(['password' => Hash::make($newPassword)]);
                break;

            case 'empresa':
                Empresas::where('folio', $userIdentifier)
                    ->update(['password' => Hash::make($newPassword)]);
                break;

            case 'vinculacion':
                Vinculacion::where('correo', $userIdentifier)
                    ->update(['password' => Hash::make($newPassword)]);
                break;

            default:
                // Manejar un caso no válido si es necesario
                break;
        }

        // Puedes devolver una respuesta de éxito o manejarla de acuerdo a tus necesidades
        return response()->json(['message' => 'Contraseña actualizada con éxito']);
    }

    private function determinarTipoUsuario($identifier)
    {
        // Verificar si el identificador se encuentra en la tabla de Alumnos
        $alumno = Alumno::where('numero_control', $identifier)->first();
        if ($alumno) {
            return 'alumno';
        }

        // Verificar si el identificador se encuentra en la tabla de Empresas
        $empresa = Empresas::where('folio', $identifier)->first();
        if ($empresa) {
            return 'empresa';
        }

        // Verificar si el identificador se encuentra en la tabla de Vinculaciones
        $vinculacion = Vinculacion::where('correo', $identifier)->first();
        if ($vinculacion) {
            return 'vinculacion';
        }

        // Si no se encuentra en ninguna tabla, puedes manejar otro caso o devolver null
        return null;
    }


}
