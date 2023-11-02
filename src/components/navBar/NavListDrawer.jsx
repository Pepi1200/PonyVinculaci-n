import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import LogOut from "../../Services/logOut";

const design = {width: 200, bgcolor:'#1A386A', color: "white", height: 1};

const settings = ["Cerrar sesión"]
const listItem = {borderBottom: '1px solid white',fontFamily: "arial"}
export default function NavListDrawer({navigationLinks,setOpen}){
    return(
        <Box sx={design}>
            <nav>
                <List>
                {
                    navigationLinks.map((page)=>(
                        <ListItem sx={listItem} disablePadding key={page.title}>
                            <ListItemButton component={NavLink} to={page.path} onClick={() => setOpen(false)}>
                                <ListItemText>{page.title}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))
                    
                }                                   
                </List>

                <List>
                    <ListItem disablePadding sx={listItem}>
                            <ListItemButton>
                                <ListItemText onClick={() => LogOut() }>{settings}</ListItemText>
                            </ListItemButton>
                    </ListItem>  
                </List>
            </nav>
        </Box>
    );
}