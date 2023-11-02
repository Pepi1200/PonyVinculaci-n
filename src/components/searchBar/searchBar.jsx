import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete } from '@mui/material';
import { getCarreras } from '../../Services/fetchService';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const carreraOptions = getCarreras().map((carrera) => carrera.label);
var desarrolloOptions;

export default function SearchBar({desarrollo}) {
  const [focusedInput, setFocusedInput] = useState(null);
  
  
  const handleFocus = (input) => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleInputChange = (input, value) => {
    setValues({ ...values, [input]: value });
  };

  const [values, setValues] = useState({
    palabra: '',
    carrera: '',
    desarrollo: ''
  });

  const handleButtonClick = () => {
    const nonEmptyValues = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
    const queryParams = new URLSearchParams(nonEmptyValues).toString();
    window.location.href = `/${desarrollo}/vacantes?${queryParams}`;
  };

  const location = useLocation();
  if(desarrollo === "promocion"){
    desarrolloOptions = ["Prácticas Profesionales","Vacante Laboral"];
  }else if(desarrollo === "servicio"){
    desarrolloOptions = ["Servicio Social"];
  }

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    console.log(queryParams);
    // Verifica los parámetros y actualiza los valores del estado si están presentes
    if (queryParams) {
      // Obtener y actualizar otros parámetros, si es necesario
      setValues(prevValues => ({
        ...prevValues,
        palabra: queryParams.palabra || prevValues.palabra,
        carrera: queryParams.carrera || prevValues.carrera,
        desarrollo: queryParams.desarrollo || prevValues.desarrollo,
      }));
    }
  }, [location.search]);

  return (
    <div className="search">
      <Grid container style={{ width: '70%', marginTop: '-120px', marginBottom: '120px', marginLeft: '15%' }} spacing={1}>
        <Grid item xs={focusedInput === 'palabra' ? 9 : focusedInput === 'carrera' || focusedInput === 'desarrollo' ? 1 : 4} sx={{ display: 'flex', justifyContent: "center", transition: 'all 0.3s ease-in-out'}}>
          <TextField
            className="palabraInput"
            placeholder="Palabra Clave"
            type="search"
            variant="outlined"
            sx={{
              height: '56px',
              width: '100%',
              margin: 0,
              padding: 0,
              background: 'rgba(255, 255, 255, 0.82)',
              border: '1px solid #1A386A',
              borderRadius: '30px 0px 0px 30px',
              '& ::placeholder': {
                textAlign: 'center',
                lineHeight: '74px',
                color: 'black'
                
              }
            }}
            value={values.palabra}
            onChange={(e) => handleInputChange('palabra', e.target.value)}
            onFocus={() => handleFocus('palabra')}
            onBlur={handleBlur}
          />
        </Grid>

        <Grid item xs={focusedInput === 'carrera' ? 9 : focusedInput === 'palabra' || focusedInput === 'desarrollo' ? 1 : 4} sx={{ display: 'flex', alignItems: 'flex-end', transition: 'all 0.3s ease-in-out' }}>
        <Autocomplete
            value={values.carrera}
            className="carreraInput"
            options={carreraOptions}
            getOptionLabel={(option) => option}
            sx={{width: "100%"}}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Carrera"
                variant="outlined"
                sx={{
                  height: '56px',
                  width: focusedInput === 'carrera' ? '100%' : '100%',
                  margin: 0,
                  padding: 0,
                  background: 'rgba(255, 255, 255, 0.82)',
                  border: '1px solid #1A386A',
                  '& ::placeholder': {
                    textAlign: 'center',
                    lineHeight: '74px',
                    color: 'black',
                  },
                }}
                onFocus={() => handleFocus('carrera')}
                onBlur={handleBlur}
                
              />
              )}
              onChange={(_, value) => {
                if (value) {
                  handleInputChange('carrera', value);
                } else {
                  handleInputChange('carrera', ''); // Establecer el valor a vacío
                }
              }}

          />
        </Grid>

        <Grid item xs={focusedInput === 'desarrollo' ? 9 : focusedInput === 'carrera' || focusedInput === 'palabra' ? 1 : 3} sx={{ display: 'flex', alignItems: 'flex-end', transition: 'all 0.3s ease-in-out' }}>
        <Autocomplete
            value={desarrollo === 'promocion' ? values.desarrollo : 'Servicio Social'}
            readOnly={desarrollo === 'servicio'}
            className="opcionDesarrolloInput"
            options={desarrolloOptions}
            getOptionLabel={(option) => option}
            sx={{width: "100%"}}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Opción Desarrollo"
                variant="outlined"
                sx={{
                  height: '56px',
                  width: focusedInput === 'desarrollo' ? '100%' : '100%',
                  margin: 0,
                  padding: 0,
                  background: 'rgba(255, 255, 255, 0.82)',
                  border: '1px solid #1A386A',
                  '& ::placeholder': {
                    textAlign: 'center',
                    lineHeight: '74px',
                    color: 'black',
                  },
                }}
                onFocus={() => handleFocus('desarrollo')}
                onBlur={handleBlur}
                
              />
            )}
            onChange={(_, value) => {
              if (value) {
                handleInputChange('desarrollo', value);
              } else {
                handleInputChange('desarrollo', ''); // Establecer el valor a vacío
              }
            }}
          />
        </Grid>
        
        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'flex-end', transition: 'all 0.3s ease-in-out' }}>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              height: '56px',
              borderRadius: '0px 30px 30px 0px',
              background: 'rgba(255, 255, 255, 0.82)',
              border: '1px solid #1A386A',
              color: 'black',
              fontWeight: 'bold'
            }}
            onClick={handleButtonClick}>
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
