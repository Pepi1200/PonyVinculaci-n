import { Box, Container, Grid} from "@mui/material";
import Address from "./address";
import logoEducacion from "../../images/icons/EducacionBlancotecnm.png";
const footerSx={bgcolor:'#1A386A', color: "white"};

export default function Footer(){
  return(
    <>
        <Box component="footer" sx={footerSx}  minHeight= "200px">
            <Container maxWidth="lg">
            <Grid container spacing={5} justifyContent="space-around">
              <img src={logoEducacion} alt="" style={{ width: '50%', height: 'auto' }} />
            </Grid>
                <br />
                <br />
                <Address/>
                <br/>
            </Container>
        </Box>
    </>
  );
}
