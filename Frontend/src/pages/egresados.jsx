import { getImages } from "../Services/fetchService";
import Banner from "../components/Banner/banner";
import FacebookCards from "../components/FacebookCards/FacebookCards";
import Notices from "../components/Noticias/Notices";
import Title from "../components/Title/title";
import Videos from "../components/Videos-Egresados/Videos";
const imagenes = getImages("egresados");
var banner;

export default function Egresados (){
    if(imagenes != null){
      banner = imagenes.filter((item) => item.component === "banner")[0];
    }
    return (
      <>
          <Banner page={"Egresados"} banner={banner}/>
          <Title text="Videos"/>
          <Videos/>
          <Title text="Noticias"/>
          <Notices />
          <Title text="Redes sociales"/>
          <FacebookCards />
      </>
    );
  }