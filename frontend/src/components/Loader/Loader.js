import React from 'react'
import loadingImage from "../assets/LoadingImage.png"

function Loader() {
    const LoaderStyle = {
        "width": "400px",
        "height":"450px",
        "margin":"auto"
    }

    const container={
        "width":"100%",
        "height":"100vh",
        "display":"flex",
        "background":"cadetblue"
    }
    return (
        <div style={container}>
            <img src={loadingImage} style={LoaderStyle}/>
        </div>
  )
}

export default Loader