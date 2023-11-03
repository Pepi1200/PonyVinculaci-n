const styleDiv={width: "70%", 
height: "80px", 
border: "1px solid #ffffff", 
background: "#1A386A",
boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
borderRadius: "33px",
display: "flex",
alignItems: "center", 
justifyContent: "center",
color: "white",
fontFamily: "Arial",
fontWeight: "700",
fontSize: "24",
marginLeft: "15%",
marginTop: "-49px"
};

export default function BoxTitle({title}) {
  return(
    <div style={styleDiv}>
        <p>{title}</p>
    </div>
  );
}
