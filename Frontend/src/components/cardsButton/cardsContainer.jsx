import { Container } from "@mui/material";
import CardButton from "./card";
const boxSx={display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "-130px", flexWrap:"wrap"};
export default function CardsContainer({cards}){
return(
    <>
        <Container sx={boxSx}>
            <CardButton cards={cards}/>
        </Container>
    </>
)
}
