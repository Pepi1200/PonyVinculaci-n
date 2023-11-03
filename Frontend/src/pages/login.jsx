import Cookies from "universal-cookie";
import LoginContainer from "../components/login/Login.container";

export default function Login(){
    const storedUserValue = false //Cookies.get('userType');

    if (!storedUserValue){
        return(
            <LoginContainer/>
        );
    }else{
        window.location.href = '/';
    }
}
