import { Avatar, Box, Checkbox, Container, FormControl, FormControlLabel, IconButton, InputAdornment,  Radio, RadioGroup, TextField, } from "@mui/material";
import Imagen from "../../images/icons/pony.png"
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateCookies from "../../Services/CreateCookies";

export default function LoginContainer(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const buttonStyle = {
        '--glow-color': 'rgb(255, 255, 255)',
        '--glow-spread-color': 'rgba(255, 255, 255, 0.1)',
        '--enhanced-glow-color': 'rgb(231, 206, 255)',
        '--btn-color': 'rgb(26, 56, 106)',
        border: '.25em solid var(--glow-color)',
        padding: '1em 3em',
        marginTop: '-2em',
        color: 'var(--glow-color)',
        fontSize: '15px',
        fontWeight: 'bold',
        backgroundColor: 'var(--btn-color)',
        borderRadius: '1em',
        outline: 'none',
        position: 'relative',
        transition: 'all 0.3s'
    };

    const handleButtonClick = () => {
        // Obtiene los valores 
        const userInput = document.getElementById('user').value;
        const passwordInput = document.getElementById('password').value;
        const radioButtonValue = document.querySelector('input[name="type"]:checked').value;
        
        const json = {"user": userInput, "password": passwordInput, "type": radioButtonValue, "rememberMe": rememberMe};

        CreateCookies(json);
      };

  return(
    <Box sx={{marginTop: "50px",marginBottom: "80px",background: "#FFFFFF", border: "3px solid #FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "15px", maxWidth: {xs: "90%", lg: "70%"}, marginLeft: {xs: "5%", lg: "15%"}}}>
        <Container sx={{width: "70%", background: "rgba(26, 56, 106, 0.65)", border: "4px solid #1A386A", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "20px", marginBottom: "50px", marginTop: {xs: "50px",xm: "100px", lg: "120px"} }}>
            <Container sx={{display: "flex", justifyContent: "center"}}>
                <Avatar alt="Logo Pony" src={Imagen} sx={{width: "20%", height: "auto", backgroundColor: "#1A386A", marginTop: "-15%"}}/>
            </Container>
            
            <Container sx={{display: "flex", justifyContent: "center"}}>
                <FormControl >
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="alumno" name="type" sx={{display: "flex", justifyContent: "center",flexDirection: "row", '& .MuiSvgIcon-root': {fontSize: 14}}}>
                            <FormControlLabel value="alumno" labelPlacement="bottom" control={<Radio sx={{'&.Mui-checked': {color: "white"} }}/>} label="Alumno" style={{color: "white"}} />
                            <FormControlLabel value="empresa" labelPlacement="bottom" control={<Radio sx={{'&.Mui-checked': {color: "white"} }}/>} label="Empresa" style={{color: "white" }}/>
                            <FormControlLabel value="vinculacion" labelPlacement="bottom" control={<Radio sx={{'&.Mui-checked': {color: "white"} }}/>} label="Vinculación" style={{color: "white"}}/>
                        </RadioGroup>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' , marginTop:"30px"}}>
                            <Box sx={{backgroundColor: "#1A386A", height: "100%", width: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px 0 0 10px"}}>
                                <AccountCircle sx={{ color: 'white'}} />
                            </Box>
                            <TextField id="user" label="Usuario" variant="filled" sx={{width: "100%", backgroundColor: "#D9D9D9", borderRadius: "0 10px 10px 0"}}/>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' , marginTop:"30px"}}>
                            <Box sx={{backgroundColor: "#1A386A", height: "100%", width: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px 0 0 10px"}}>
                                <LockIcon sx={{ color: 'white'}} />
                            </Box>

                            <TextField
                            id="password"
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            variant="filled"
                            sx={{width: "100%", backgroundColor: "#D9D9D9", borderRadius: "0 10px 10px 0"}}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}
                            />
                            
                           
                        </Box>

                        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
                            <FormControlLabel
                            id="remember"
                            onChange={(e) => setRememberMe(e.target.checked)}
                            control={<Checkbox sx={{color: "white", '&.Mui-checked': {color: "white",}, }} />}
                            label={
                                <span style={{ fontSize: "12px" }}>Recuérdame</span>
                            }
                            labelPlacement="end"
                            size="small"
                            sx={{color: "white", '&.Mui-checked': {color: "white"}, fontSize: "10px" }}
                            />

                            <Link to="/registro" style={{color: "white", fontSize: "12px", fontFamily: "arial"}}>
                                Registrate.
                            </Link>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: "center", marginTop:"50px", marginBottom: "50px"}}>
                            <button
                                style={buttonStyle}
                                onClick={handleButtonClick}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = 'var(--btn-color)';
                                    e.currentTarget.style.backgroundColor = 'var(--glow-color)';
                                    e.currentTarget.style.boxShadow = '0 0 1em .25em var(--glow-color), 0 0 4em 2em var(--glow-spread-color), inset 0 0 .75em .25em var(--glow-color)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = 'var(--glow-color)';
                                    e.currentTarget.style.backgroundColor = 'var(--btn-color)';
                                    e.currentTarget.style.boxShadow = '';
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 0.6em .25em var(--glow-color), 0 0 2.5em 2em var(--glow-spread-color), inset 0 0 .5em .25em var(--glow-color)';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.boxShadow = '';
                                }}
                                >
                                    Iniciar Sesión
                            </button>
                        </Box>
                </FormControl>
            </Container>
        </Container>
    </Box>
  );
}
