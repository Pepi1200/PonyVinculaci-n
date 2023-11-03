import { getImages } from "../Services/fetchService";
import Banner from "../components/Banner/banner";
import FacebookCards from "../components/FacebookCards/FacebookCards";
import Notices from "../components/Noticias/Notices";
import Title from "../components/Title/title";
import CardsContainer from "../components/cardsButton/cardsContainer";

const imagenes = getImages("index");
var banner,cards;

export default function home (){
  if(imagenes != null){
    banner = imagenes.filter((item) => item.component === "banner")[0];
    cards = imagenes.filter((item) => item.component === "card"); 
  }

  return (
    <>       
        <Banner page={"home"} banner={banner}/>
        <CardsContainer cards={cards}/>
        <Title text="Noticias"/>
        <Notices />
        <Title text="Redes sociales"/>
        <FacebookCards />
    </>
  );
}





