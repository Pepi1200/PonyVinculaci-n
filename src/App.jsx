import { Box} from "@mui/material";
import NavBar from "./components/navBar/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Servicio from "./pages/servicio";
import Promocion from "./pages/promocion";
import Registro from "./pages/registro";
import Vacantes from "./pages/vacantes";
import Egresados from "./pages/egresados";
import Footer from "./components/Footer/footer";
import setCookieUser from "./models/example-Functions/createCookies";
import Cookies from "universal-cookie";
import cryptoJs from "crypto-js";
import Login from "./pages/login";
import PonyChat from "./components/ponychat/PonyChat";
const cookies = new Cookies(null, { path: '/' });
const secretKey = 'clave';//cambiar despues de pruebas 

var navigationLinks = [
  {title: "Departamento de gestión estrategica" , path: "/"},
  {title: "Servicio social" , path: "/servicio"},
  {title: "Promoción profesional" , path: "/promocion"},
  {title: "Egresados" , path: "/egresados"},
  {title: "Registrate" , path: "/registro"}
];

const storedUserValue = cookies.get('userType');

  if (storedUserValue) {
    const decryptedUserValue = cryptoJs.AES.decrypt(storedUserValue, secretKey).toString(cryptoJs.enc.Utf8);
    if(decryptedUserValue === "Alumno"){//Menu para alumno
      navigationLinks = [
        {title: "Departamento de gestión estrategica" , path: "/"},
        {title: "Servicio social" , path: "/servicio"},
        {title: "Promoción profesional" , path: "/promocion"},
        {title: "Egresados" , path: "/egresados"}
      ];
    }else if(decryptedUserValue === "Empresa"){//Menu para empresas
      navigationLinks = [
        {title: "Departamento de gestión estrategica" , path: "/"},
        {title: "Servicio social" , path: "/servicio"},
        {title: "Promoción profesional" , path: "/promocion"},
        {title: "Publicar vacante" , path: "/vacantes"},
        {title: "Egresados" , path: "/egresados"}
      ];
    }else if(decryptedUserValue === "Vinculacion"){//Menu para Vinculacion
      navigationLinks = [
        {title: "Departamento de gestión estrategica" , path: "/"},
        {title: "Servicio social" , path: "/servicio"},
        {title: "Promoción profesional" , path: "/promocion"},
        {title: "Empresas" , path: "/empresas"},
        {title: "Registrar empresa" , path: "/registro"},
        {title: "Registrar alumno" , path: "/registro"},
        {title: "Publicar vacante" , path: "/vacantes"},
        {title: "Egresados" , path: "/egresados"}
      ];
    }else{
      navigationLinks=null;
    }
  }



export default function App(){
  //setCookieUser({tipoUsuario: "Empresa"});//solo para pruebas
  return(
    <>
      <NavBar navigationLinks={navigationLinks}/> 
      <Box sx={{margin: "0", padding: "0", maxWidth: "xl"}}>
        <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/servicio" element={ <Servicio /> }/>
            <Route path="/promocion" element={ <Promocion /> }/>
            <Route path="/registro" element={ <Registro /> }/>
            <Route path="/Egresados" element={ <Egresados /> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/promocion/vacantes" element={ <Vacantes desarrollo="promocion" /> }/>
            <Route path="/servicio/vacantes" element={ <Vacantes desarrollo="servicio"/> }/>
            <Route path="/promocion/vacantes/:id"  />
        </Routes>
      </Box>
      <Footer/>
    </>
  );
}