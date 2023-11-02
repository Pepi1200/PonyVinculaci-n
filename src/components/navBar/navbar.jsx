import { AppBar, Avatar, Drawer, Icon, IconButton, Toolbar } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "../../images/icons/menuIcon.png";
import LogoIcon from "../../images/logos/logoHeaderDepartamento.png"
import Cookies from "universal-cookie";
import cryptoJs from "crypto-js";
import toBase64 from "../pure/blobToBase64";
import { getAvatar } from "../../Services/fetchService";
const cookies = new Cookies(null, { path: '/' });
const secretKey = 'clave';//cambiar despues de pruebas 

var userImage = getAvatar()[0];
const userName = cookies.get('userName');

function avatar() {
    if (typeof userImage !== 'undefined'|| userImage !== null || userName !== null) {  
        if (userImage) {
            return (
                <Avatar src={`data:image/jpeg;base64, ${toBase64(userImage)}`} sx={{ bgcolor: '#936C36' }}/>
            );
        } else if (userName) {
            const userNameDecrypted = cryptoJs.AES.decrypt(userName, secretKey).toString(cryptoJs.enc.Utf8);
            return (
                <Avatar sx={{ bgcolor: '#936C36' }}>
                    {userNameDecrypted.split(' ')[0][0]}
                    {userNameDecrypted.split(' ')[1][0]}
                </Avatar>
            );
        }
    }
}


export default function NavBar({navigationLinks}){
    const [open,setOpen] = useState(false);

    return(
        <>
            <AppBar position="sticky" sx={{bgcolor:'#1A386A'}}>
                <Toolbar>
                    <Icon sx={{flexGrow: 1,  height: 50, width:50}}>
                        <a id="logo" href="/" >
						<img src={LogoIcon} alt="logo"  align="left" height= "50" width="50"/>
					    </a>
                    </Icon>
                    {avatar()}
                    <IconButton onClick={() => setOpen(true)} ><img src={MenuIcon} alt="Menú" style={{ width: '45px', height: '53px'}} /></IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={open} anchor="right" onClick={() => setOpen(false)}>
                <NavListDrawer navigationLinks={navigationLinks} setOpen={setOpen}/>
            </Drawer>            
        </>
    );
}