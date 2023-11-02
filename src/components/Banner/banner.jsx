import { Box, Typography } from "@mui/material";
import toBase64 from "../pure/blobToBase64";
import imagen from "../../images/backgroundTec.png"

export default function Banner({page, banner}){
    if(banner != null ){
        const encodedString = toBase64(banner.image);
        return(
            <Box component="div"
            sx={{
              display: "flex",  
              width: 1,
              minHeight: 600,
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('data:image/jpeg;base64, ${encodedString}') `,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              borderRadius: '0px 0px 50% 0px',
              color: "white",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "center"
            }}>
                <Typography variant="h3" fontWeight={"bold"} maxWidth={580}>
                    {banner.title}
                </Typography>
                <br/>
                <Typography maxWidth={580}>
                    {banner.text}
                </Typography>
            </Box>
        );
    }else{
        return(
            <Box component="div"
            sx={{
              display: "flex",  
              width: 1,
              minHeight: 500,
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${imagen})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              borderRadius: '0px 0px 50% 0px',
              color: "white",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "center"
            }}>
                <Typography variant="h4" fontWeight={"bold"}>
                    {page}
                </Typography>
            </Box>
        );
    }
}
