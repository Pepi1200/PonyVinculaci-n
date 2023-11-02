import { useState } from 'react';
import { getVacantes } from '../../Services/fetchService';
import Vacante from './vacante';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

export default function VacantesContainer() {
  const vacantesPorPagina = 5; // Número de vacantes a mostrar por página
  const [paginaActual, setPaginaActual] = useState(1);

  const vacantesTotales = getVacantes();
  const cantidadPaginas = Math.ceil(vacantesTotales.length / vacantesPorPagina);

  const handlePaginaCambio = (event, value) => {
    setPaginaActual(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastVacante = paginaActual * vacantesPorPagina;
  const indexOfFirstVacante = indexOfLastVacante - vacantesPorPagina;
  const vacantesPaginadas = vacantesTotales.slice(indexOfFirstVacante, indexOfLastVacante);

  return (
    <>
      {vacantesPaginadas.map((vacante) => (
        <Vacante vacante={vacante} key={vacante.id_vacante} />
      ))}
      <Box sx={{display: "flex", justifyContent:"center", marginBottom: "70px"}}>
        <Pagination count={cantidadPaginas} page={paginaActual} onChange={handlePaginaCambio} color="primary"/>
      </Box>
    </>
  );
}

