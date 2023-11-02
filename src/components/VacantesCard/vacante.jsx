import { Container, Grid, Typography } from "@mui/material";
import toBase64 from "../pure/blobToBase64";
import DefaultImage from "../../images/default/empresaDefault.png"
import { Link } from 'react-router-dom';

var image = DefaultImage;


export default function Vacante({ vacante }) {
    if(vacante.image !== null && vacante.image !== "" && vacante.image !== 'undefined'){
        image = `data:image/jpeg;base64,${toBase64(vacante.image)}`;
    }

    return (
      <Container sx={{ borderRadius: "10px", border: "1px solid rgba(26, 56, 106, 0.55)", boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)", marginBottom: "55px", minHeight: "300px",  width: {xs: "90%"}}}>
        <Link key={vacante.id_vacante} to={`/promocion/vacantes?vacante_id=${vacante.id_vacante}`} style={{ textDecoration: 'none', color: "black", width: "100%", height: "100%"}}>
          <Grid container sx={{ display: "flex", flexDirection: "column", margin: "10px"}}>
            
            <Grid container sx={{ display: "flex", flexDirection: "row", marginBottom: "25px" }}>
              <Grid item xs={2} height={"100px"} width={"100px"} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <img alt={vacante.empresa} src={image} height={"100px"} width={"100px"}/>
              </Grid>

              <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                <Typography variant="h2" sx={{fontWeight: "700",fontSize: "18px",marginBottom: "10px"}}>{vacante.title}</Typography>
                <Typography variant="h3" sx={{fontWeight: "400",fontSize: "14px",marginBottom: "10px", color: "#808080"}}>{vacante.empresa}</Typography>
              </Grid>

              <Grid item xs={2}>
              <ul>
                {vacante.tipo.map((tipo,index) => (
                  <>
                    <li key={index}>
                        <Typography variant="h3" sx={{fontWeight: "400",fontSize: "14px", color: "#1A386A"}}>{tipo}</Typography>
                    </li>
                    <br />
                  </>
                ))}
                </ul>
              </Grid>
            </Grid>

            <Grid container sx={{ display: "flex", flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
                <Grid item xs={12} sm={2} sx={{ display: { xs: 'none', sm: 'block' }}} >
                    <table style={{ display: 'flex', flexDirection: "column", width: '100%'  }}>
                        <tbody style={{ display: 'flex', flexDirection: "column", width: '100%' }}>
                            {vacante.carrera.map((carrera, index) => (
                                <tr key={index} style={{ width: '100%' }}>
                                    <td>
                                        <Typography variant="h3" sx={{fontWeight: "400",fontSize: "14px", color: "#1A386A"}}>{carrera}</Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>

                <Grid item xs={12} sm={2} sx={{ display: { xs: 'block', sm: 'none' }}}>
                    <table style={{ display: 'flex', flexDirection: "row", width: '100%' }}>
                        <tbody style={{ display: 'flex', flexDirection: "row", width: '100%' }}>
                            {vacante.carrera.map((carrera, index) => (
                                <tr  style={{ width: '100%' }}>
                                    <td key={index}>
                                        <Typography variant="h3" sx={{fontWeight: "400",fontSize: "14px", color: "#1A386A"}}>{carrera}</Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>

              <Grid item xs={10}>
                <Typography variant="h3" sx={{fontWeight: "400",fontSize: "14px",marginBottom: "10px"}}>{vacante.descripcion}</Typography>
              </Grid>
            </Grid>

          </Grid>
        </Link>
      </Container>
    );
  }
