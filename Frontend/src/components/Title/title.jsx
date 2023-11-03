import { Box, Typography } from "@mui/material";

export default function Title({text}){
  return(
    <>
        <Box  sx={{margin: "50px"}}>
            <Typography variant="h5" sx={{fontFamily: "arial", fontSize: "20", fontWeight: "600"}}>
                    {text}
            </Typography>
            <hr style={{marginLeft: "0",width: "62px", border: "3px solid #6366F1", borderRadius: "3px"}}/>
        </Box>
    </>
  );
}
