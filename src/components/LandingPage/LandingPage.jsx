import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return (
        <div className="contenedor">
            <div className="titulo-animado">
                 <h1>Bienvenidos a la Galeria de Dogs</h1>
            </div>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
            
        </div>
    )
}