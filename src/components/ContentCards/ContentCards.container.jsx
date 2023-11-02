import { Box } from "@mui/material";
import ContentCards from "./ContentCards";

export default function ContentCardsContainer({cards}){
  return(
    <Box sx={{marginTop: "50px" , marginBottom: "70px", marginRight: "0", marginLeft: "0", width: "100%"}}>
        <ContentCards cards={cards}/>
    </Box>
  );
}
