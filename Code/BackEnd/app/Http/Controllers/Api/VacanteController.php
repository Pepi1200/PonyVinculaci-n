<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vacante; 
use App\Models\Empresas; 
use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;


class VacanteController extends Controller
{
    public function index()
    {
        $fechaActual = Carbon::now();
        $vacantes = Vacante::with(['empresa:id,nombre_comercial,telefono,logo', 'carreras:id,nombre'])
            ->where('visible', 1)
            ->where('aceptada', 1)
            ->where('fecha_cierre', '>', $fechaActual)
            ->get(['id', 'titulo', 'id_empresa', 'descripcion', 'fecha_cierre', 'aceptada', 'visible', 'practicas', 'laboral', 'created_at', 'updated_at']);

        // Convert the logo to a base64-encoded string
        $vacantes->each(function ($vacante) {
            $vacante->empresa->logo = base64_encode($vacante->empresa->logo);

            $tipos = [];
            if ($vacante->practicas) {
                $tipos[] = 'Practicas';
            }
            if ($vacante->laboral) {
                $tipos[] = 'Vacante Laboral';
            }
    
            $vacante->tipo = $tipos;
        });

        return response()->json(['vacantes' => $vacantes]);
    }

    public function showFilteredVacantes(Request $request)
    {
        $fechaActual = Carbon::now();

        $palabraClave = $request->input('palabra');
        $carrera = $request->input('carrera');
        $desarrollo = $request->input('desarrollo');
        $user = $request->input('user');
        if($user){
            $folio = Crypt::decryptString($user);
        }else{
            $folio = "";
        }
        $vacantes = Vacante::with(['empresa:id,folio,nombre_comercial,telefono,logo', 'carreras:id,nombre'])
            ->where('fecha_cierre', '>', $fechaActual)
            ->when($folio, function ($query, $folio) {
                return $query->whereHas('empresa', function ($subquery) use ($folio) {
                    $subquery->where('folio', $folio);
                });
            })
            ->when($palabraClave, function ($query, $palabraClave) {
                return $query->where(function ($subquery) use ($palabraClave) {
                    $subquery->where('titulo', 'like', '%' . $palabraClave . '%')
                        ->orWhere('descripcion', 'like', '%' . $palabraClave . '%');
                });
            })
            ->when($carrera, function ($query, $carrera) {
                return $query->whereHas('carreras', function ($subquery) use ($carrera) {
                    $subquery->where('nombre', $carrera);
                });
            })
            ->when($desarrollo, function ($query, $desarrollo) {
                return $query->where(function ($subquery) use ($desarrollo) {
                    if ($desarrollo === 'Prácticas Profesionales') {
                        $subquery->where('practicas', 1);
                    } elseif ($desarrollo === 'Vacante Laboral') {
                        $subquery->where('laboral', 1);
                    }
                });
            })
            ->orderBy('created_at', 'desc')
            ->get(['id', 'titulo', 'Id_empresa', 'descripcion', 'fecha_cierre', 'aceptada','pending', 'visible', 'practicas', 'laboral', 'created_at', 'updated_at']);

        $vacantes->each(function ($vacante) {
            if ($vacante->empresa) {
                $vacante->empresa->logo = $vacante->empresa->logo;
            }
            $tipos = [];
            if ($vacante->practicas) {
                $tipos[] = 'Prácticas profesionales';
            }
            if ($vacante->laboral) {
                $tipos[] = 'Vacante Laboral';
            }

            $vacante->tipo = $tipos;
        });

        return response()->json(['vacantes' => $vacantes]);
    }
    
    public function bolsa(Request $request)
    {
        $fechaActual = Carbon::now();

        $palabraClave = $request->input('palabra');
        $carrera = $request->input('carrera');
        $desarrollo = $request->input('desarrollo');

        $vacantes = Vacante::with(['empresa:id,folio,nombre_comercial,telefono,logo', 'carreras:id,nombre'])
            ->where('fecha_cierre', '>', $fechaActual)
            ->where('aceptada', 1)
            ->where('visible', 1)
            ->when($palabraClave, function ($query, $palabraClave) {
                return $query->where(function ($subquery) use ($palabraClave) {
                    $subquery->where('titulo', 'like', '%' . $palabraClave . '%')
                        ->orWhere('descripcion', 'like', '%' . $palabraClave . '%');
                });
            })
            ->when($carrera, function ($query, $carrera) {
                return $query->whereHas('carreras', function ($subquery) use ($carrera) {
                    $subquery->where('nombre', $carrera);
                });
            })
            ->when($desarrollo, function ($query, $desarrollo) {
                return $query->where(function ($subquery) use ($desarrollo) {
                    if ($desarrollo === 'Prácticas Profesionales') {
                        $subquery->where('practicas', 1);
                    } elseif ($desarrollo === 'Vacante Laboral') {
                        $subquery->where('laboral', 1);
                    }
                });
            })
            ->orderBy('created_at', 'desc')
            ->get(['id', 'titulo', 'Id_empresa', 'descripcion', 'fecha_cierre', 'aceptada','pending', 'visible', 'practicas', 'laboral', 'created_at', 'updated_at']);

        $vacantes->each(function ($vacante) {
            if ($vacante->empresa) {
                $vacante->empresa->logo = $vacante->empresa->logo;
            }
            $tipos = [];
            if ($vacante->practicas) {
                $tipos[] = 'Prácticas profesionales';
            }
            if ($vacante->laboral) {
                $tipos[] = 'Vacante Laboral';
            }

            $vacante->tipo = $tipos;
        });

        return response()->json(['vacantes' => $vacantes]);
    }

    public function allVacantes()
    {
        $vacantes = Vacante::with(['empresa:id,nombre_comercial,telefono,logo', 'carreras:id,nombre'])
            ->get(['id', 'titulo', 'id_empresa', 'descripcion', 'fecha_cierre', 'aceptada', 'visible', 'practicas', 'laboral', 'created_at', 'updated_at']);

        // Convert the logo to a base64-encoded string
        $vacantes->each(function ($vacante) {
            $vacante->empresa->logo = base64_encode($vacante->empresa->logo);

            $tipos = [];
            if ($vacante->practicas) {
                $tipos[] = 'Practicas';
            }
            if ($vacante->laboral) {
                $tipos[] = 'Vacante Laboral';
            }
    
            $vacante->tipo = $tipos;
        });

        return response()->json(['vacantes' => $vacantes]);
    }
  
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_cierre' => 'required|date',
        ]);

        $folioEmpresa = null;

        if ($request->has('folio')) {
            // Si se proporciona directamente el folio
            $folioEmpresa = $request->input('folio');
        } elseif ($request->has('folioEncriptado')) {
            try {
                $folioEmpresa = Crypt::decryptString($request->input('folioEncriptado'));
            } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
                return response()->json(['error' => 'Error al descifrar el folio'], 400);
            }
        }

        if (!$folioEmpresa) {
            return response()->json(['error' => 'Folio no proporcionado'], 400);
        }
        
        $empresa = Empresas::where('folio', $folioEmpresa)->first();
        if (!$empresa) {
            return response()->json(['error' => 'Empresa no encontrada'], 404);
        }
        $idEmpresa = $empresa->id;
        $vacante = new Vacante([
            'titulo' => $request->input('titulo'),
            'descripcion' => $request->input('descripcion'),
            'fecha_cierre' => Carbon::parse($request->input('fecha_cierre')),
            'aceptada' => 0,
            'visible' => 0,
            'laboral' => $request->input('laboral') === 'on' || $request->input('laboral') === 1 ? 1 : 0,
            'practicas' => $request->input('practicas') === 'on' || $request->input('practicas') === 1 ? 1 : 0,
            'pending' => 0,
            'Id_empresa' => $idEmpresa,
        ]);
        
        $vacante->save();
        $carrerasSeleccionadas = $request->input('carrerasSeleccionadas');

        if ($carrerasSeleccionadas && is_array($carrerasSeleccionadas)) {
            $vacante->carreras()->attach($carrerasSeleccionadas);
        }
        return response()->json(['message' => 'Vacante creada exitosamente', 'vacante' => $vacante], 201);
    }

    public function show(string $id)
    {
        $vacante = Vacante::with(['empresa', 'carreras'])->find($id);

        if ($vacante) {
            $laboral = $vacante->laboral ? 1 : 0;
            $practicas = $vacante->practicas ? 1 : 0;

            return response()->json([
                'id' => $vacante->id,
                'titulo' => $vacante->titulo,
                'descripcion' => $vacante->descripcion,
                'fecha_cierre' => $vacante->fecha_cierre,
                'aceptada' => $vacante->aceptada,
                'visible' => $vacante->visible,
                'laboral' => $laboral,
                'practicas' => $practicas,
                'folio' => $vacante->empresa->folio,
                'carrerasSeleccionadas' => $vacante->carreras->pluck('id')->toArray(),
            ]);
        } else {
            // Si no se encuentra la vacante, puedes devolver una respuesta adecuada
            return response()->json(['error' => 'Vacante no encontrada'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        // Validar la solicitud
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_cierre' => 'required|date',
            'carrerasSeleccionadas' => 'array',
            'carrerasSeleccionadas.*' => 'exists:carreras,id',
        ]);

        // Obtener la vacante existente
        $vacante = Vacante::find($id);

        // Verificar si la vacante existe
        if (!$vacante) {
            return response()->json(['error' => 'Vacante no encontrada'], 404);
        }

        // Actualizar los campos de la vacante
        $vacante->titulo = $request->input('titulo');
        $vacante->descripcion = $request->input('descripcion');
        $vacante->fecha_cierre = Carbon::parse($request->input('fecha_cierre'));
        $vacante->laboral = $request->input('laboral') === true || $request->input('laboral') === 1 ? 1 : 0;
        $vacante->practicas = $request->input('practicas') === true || $request->input('practicas') === 1 ? 1 : 0;
        $vacante->pending = 0;
        $vacante-> aceptada = 0;

        // Actualizar las relaciones (carreras)
        $carrerasSeleccionadas = $request->input('carrerasSeleccionadas');
        $vacante->carreras()->sync($carrerasSeleccionadas);

        // Guardar los cambios en la base de datos
        $vacante->save();

        // Devolver la respuesta
        return response()->json(['message' => 'Vacante actualizada exitosamente', 'vacante' => $vacante]);
    }

    public function destroy(string $id)
    {
        DB::table('carrera_vacante')->where('vacante_id', $id)->delete();
        Vacante::destroy($id);
    }

    public function visibility(string $id)
    {
        try {
            $vacante = Vacante::findOrFail($id);
            
            // Cambiar el valor del campo visible entre 0 y 1
            $vacante->visible = $vacante->visible == 1 ? 0 : 1;
            
            // Guardar los cambios en la base de datos
            $vacante->save();

            return response()->json(['message' => 'Visibilidad actualizada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la visibilidad'], 500);
        }
    }

    public function acepted(string $id)
    {
        try {
            $vacante = Vacante::findOrFail($id);
            
            // Cambiar el valor del campo visible entre 0 y 1
            $vacante->aceptada = $vacante->aceptada == 1 ? 0 : 1;
            $vacante->pending = 1;
            // Guardar los cambios en la base de datos
            $vacante->save();

            return response()->json(['message' => 'Aceptada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la visibilidad'], 500);
        }
    }
}
