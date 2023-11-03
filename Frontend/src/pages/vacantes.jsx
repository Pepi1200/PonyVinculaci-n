import { getImages} from "../Services/fetchService";
import Banner from "../components/Banner/banner";
import VacantesContainer from "../components/VacantesCard/Vacantes.Container";
import SearchBar from "../components/searchBar/searchBar";

const imagenes = getImages("vacantes");
var banner;

export default function Vacantes ({desarrollo}){
  if(imagenes != null){
    banner = imagenes.filter((item) => item.component === "banner")[0];
  }
    return (
      <>
          <Banner page={"vacantes"} banner={banner}/>
          <SearchBar desarrollo={desarrollo}/>
          <VacantesContainer/>
      </>
    );
  }