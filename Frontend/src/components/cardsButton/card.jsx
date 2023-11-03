import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import toBase64 from '../pure/blobToBase64';
import { Link } from 'react-router-dom';

const cardSx={ maxWidth: 300 , minHeight: 430, borderRadius: "31px", backgroundColor: "white", boxShadow: "0px 0px 2px 2px rgb(0, 0, 0, 0.2)", marginBottom: "50px"};

export default function CardButton({ cards }) {
    if(cards != null){
        return (
            <>
              {cards.map((card) => (
                
                <Card sx={cardSx} key={card.id_image}>
                    <Link key={card.id_image} to={`${card.link}`} style={{ textDecoration: 'none', color: "black"}}>
                        <CardActionArea sx={{ maxWidth: 300, minHeight: 430, textAlign: "center"}}>
                            <CardMedia
                            component="img"
                            image={`data:image/jpeg;base64, ${toBase64(card.image)}`}
                            alt={card.name}
                            sx={{width: "80%", height: "250", marginLeft: "10%"}}
                            />
                            <CardContent >
                            <Typography gutterBottom component="div" fontFamily="arial" fontSize={20} fontWeight="600">
                                {card.title}
                            </Typography>
                            <Typography color="text.secondary">
                                <div dangerouslySetInnerHTML={{ __html: card.text }} />
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                </Card>
              ))}
            </>
          );
    }
  }
  
