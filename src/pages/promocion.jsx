import { getImages} from "../Services/fetchService";
import Banner from "../components/Banner/banner";
import ContentCardsContainer from "../components/ContentCards/ContentCards.container";
import FacebookCards from "../components/FacebookCards/FacebookCards";
import Notices from "../components/Noticias/Notices";
import Title from "../components/Title/title";

const imagenes = getImages("promocion");
var banner, contentCards;

export default function Promocion (){
  if(imagenes != null){
    banner = imagenes.filter((item) => item.component === "banner")[0];
    contentCards = imagenes.filter((item) => item.component === "ContentCard");
  }
    return (
      <>
          <Banner page={"promocion"} banner={banner} />     
          <ContentCardsContainer cards={contentCards}/>
          <Title text="Noticias"/>
          <Notices />
          <Title text="Redes sociales"/>
          <FacebookCards />
      </>
    );
  }