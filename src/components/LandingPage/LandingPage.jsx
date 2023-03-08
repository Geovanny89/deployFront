import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return (
        <div className="contenedor">
            <div className="titulo">
                 <h1>Bienvenidos A Mis Dogs</h1>
            </div>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
            {/* <div className="fondo">
                <img src="https://estaticos.muyinteresante.es/uploads/images/gallery/6124cf315cafe8c3101f8bab/perro_redes.jpg" alt="Img not found" />
            </div> */}
        </div>
    )
}