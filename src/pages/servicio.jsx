import { getImages} from "../Services/fetchService";
import Banner from "../components/Banner/banner";
import BoxTitle from "../components/BoxTitle/BoxTitle";
import ContentCardsContainer from "../components/ContentCards/ContentCards.container";
import FacebookCards from "../components/FacebookCards/FacebookCards";
import Notices from "../components/Noticias/Notices";
import Title from "../components/Title/title";

const imagenes = getImages("servicio");
var banner,contentCards;

export default function Servicio (){
  if(imagenes != null){
    banner = imagenes.filter((item) => item.component === "banner")[0];
    contentCards = imagenes.filter((item) => item.component === "ContentCard");
  }
    return (
      <>
          <Banner page={"servicio"} banner={banner}/> 
          <BoxTitle title={"Pasos para el proceso del Servicio Social"}/>       
          <ContentCardsContainer cards={contentCards}/>
          <Title text="Noticias"/>
          <Notices />
          <Title text="Redes sociales"/>
          <FacebookCards />
      </>
    );
  }