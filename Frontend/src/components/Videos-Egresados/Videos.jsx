import React, { useState, useEffect } from 'react';
import { Container, Typography, Stack, Pagination, Box } from "@mui/material";
import VideoPlayer from './videoPlayer'; // Asegúrate de importar correctamente tu componente VideoPlayer
import { getVideos } from "../../Services/fetchService";

const itemsPerPage = 6; // Cantidad de videos por página
const itemsPerPageFirstPage = 5; // Cantidad de videos por página en la primera página

const containerSx = { display: "flex", justifyContent: "space-around", flexWrap: "wrap" };

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1); // Cambiamos a 1 para que la página inicial sea 1 en lugar de 0.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoList = await getVideos();
        setVideos(videoList);
      } catch (error) {
        console.error("Error al obtener la lista de videos:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (page - 1) * (page === 1 ? itemsPerPageFirstPage : itemsPerPage);
  const endIndex = startIndex + (page === 1 ? itemsPerPageFirstPage : itemsPerPage);
  const paginatedVideos = videos.slice(startIndex, endIndex);

  return (
    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      <Container sx={containerSx}>
        {page === 1 && (
          <div style={{ width: "355px", marginBottom: "50px" }}>
            <iframe
              width="355"
              height="200"
              src="https://www.youtube.com/embed/fdHwSZ8b1Po?si=v_mlDTjr_8YPc__z"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>ITM</Typography>
            <Typography sx={{ fontWeight: "normal", fontSize: "14px" }}>Tecnológico Nacional de México, Campus Morelia</Typography>
          </div>
        )}
        {paginatedVideos.map((file, index) => {
          const parts = file.split('.');
          if (parts.length >= 2) {
            const namePart = parts[0];
    
            const firstDashIndex = namePart.indexOf('-');
            if (firstDashIndex !== -1) {
              const part1 = namePart.substring(0, firstDashIndex).trim();
              const part2 = namePart.substring(firstDashIndex + 1).trim();

              return (
                <div key={index} style={{ width: "355px", marginBottom: "50px" }}>
                  <VideoPlayer videoURL={file} />
                  <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    {part1}
                  </Typography>
                  <Typography sx={{ fontWeight: "normal", fontSize: "14px" }}>
                    {part2}
                  </Typography>
                </div>
              );
            } else {
              console.log("Nombre de archivo no válido:", file);
              return null; // O manejar el error de otra manera
            }
          } else {
            console.log("Nombre de archivo no válido:", file);
            return null; // O manejar el error de otra manera
          }
        })}
      </Container>

      <Stack spacing={2} style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={Math.ceil(videos.length / (page === 1 ? itemsPerPageFirstPage : itemsPerPage))}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default Video;
