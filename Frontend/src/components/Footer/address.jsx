import { Grid, Typography } from "@mui/material";
const addresses = [
    {campus: "Campus I", direccion: "Avenida Tecnólogico #1500,Col. Lomas de Santiaguito, Morelia, Michoacán"},
    {campus: "Campus II", direccion: "Camino de la Arboleada S/N, Residencial San Jose de la Huerta, Morelia, Michoacán"}
    ];

const GridSx={textAlign: "-webkit-center"};
const h6Sx={fontSize: 20, fontWeight: "bold"};

export default function Address(){
    return(
        <>
        <Grid container spacing={5} justifyContent="space-around">
            {
                addresses.map((address) =>(
                    <Grid item xs={12} sm={4} sx={GridSx} key={address.campus}>
                            <Typography variant="h6" gutterBottom sx={h6Sx}>
                                {address.campus}
                            </Typography>
                            
                            <Typography variant="body2" maxWidth={250}>
                                {address.direccion}
                            </Typography>
                    </Grid> 
                ))
            }
        </Grid> 
        </>
    )
  
}
