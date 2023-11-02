import { Box } from '@mui/material';
import React from 'react';
 
const FacebookPages = ({ pages }) => {
  return (
    <Box marginBottom="100px" display="flex" justifyContent="space-evenly" flexWrap={"wrap"}>
      {pages.map((page, index) => (
        <div key={index} style={{marginBottom: "50px"}}>
          <iframe
            title={page.name}
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(page.link)}&tabs=timeline&width=300&height=430&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
            width="300"
            height="430"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      ))}
    </Box>
  );
};

const Facebook = [
  { name: "ITM Vinculación - Promoción Profesional", link: "https://www.facebook.com/itm.vinculacion.promocion.profesional" },
  { name: "ITM Vinculación - Seguimiento a egresados", link: "https://www.facebook.com/ITMSeguimientoDeEgresadosOficial/" },
  { name: "ITM Vinculación - Servicio Social", link: "https://www.facebook.com/profile.php?id=100071588094372" }
];

function FacebookCards() {
  return (
      <FacebookPages pages={Facebook} />
  );
}

export default FacebookCards;
