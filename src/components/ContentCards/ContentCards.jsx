import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import toBase64 from '../pure/blobToBase64';


const ContentCards = ({cards}) => {
    return (
        <div>
          {cards.map((card, index) => (
            index % 2 === 0 ? leftCard(card) : rightCard(card)
          ))}
        </div>
      );
};

const leftCard = (card) => {
    return (
      <Card id={card.image_id} sx={{marginBottom: "30px", marginLeft: "5%", width: "70%", border: "1px solid #1A386A", borderRadius:"30px",boxShadow:"5px 5px 10px rgba(0, 0, 0, 0.25)"}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} lg={3}>
            <CardMedia component="div" sx={{height: "215px", display: "flex", justifyContent: "center", alignContent: "center"}}>
              <img height="200px" width="215px" src={`data:image/jpeg;base64, ${toBase64(card.image)}`} alt={card.name} style={{marginTop: "10px", marginBottom: "10px", borderRadius: "20px"}} />
            </CardMedia>
          </Grid>
          
          <Grid item xs={12} sm={7} lg={9}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                  {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                    <div dangerouslySetInnerHTML={{ __html: card.text }} />
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    );
  };

const rightCard = (card) => {
    return (
      <Card id={card.image_id} sx={{marginBottom: "30px", marginLeft: "calc(30% - 10%)", width: "70%" , border: "1px solid #1A386A", borderRadius:"30px", boxShadow:"5px 5px 10px rgba(0, 0, 0, 0.25)"}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={7} lg={9}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <div dangerouslySetInnerHTML={{ __html: card.text }} />
                </Typography>
                </CardContent>
            </Grid>

            <Grid item xs={12} sm={5} lg={3}>
                <CardMedia component="div" sx={{height: "215px", display: "flex", justifyContent: "center", alignContent: "center"}}>
                <img height="200px" width="215px" src={`data:image/jpeg;base64, ${toBase64(card.image)}`} alt={card.name} style={{marginTop: "10px", marginBottom: "10px", borderRadius: "20px"}} />
                </CardMedia>
            </Grid> 
        </Grid>
      </Card>
    );
};

export default ContentCards;
