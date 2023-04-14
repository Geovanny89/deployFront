/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

export default function Card({name, temperament, weigth, image,id}){
    return (
        
        <div className="card">
            <div className="cardbuton">
                <Link  to={`/dogs/${id}`}>
                    <button>Ver Mas</button>
                </Link>
            </div>
            <div className="card-nombre">
                <h1>{name}</h1>
            </div>
            <div className="card-img">
                <img src={image} alt="img Not Found" />
            </div>
            <div className="card-tempe">
                <h5>Temperamento: {temperament + ' '}</h5>
            </div>
            <div className="card-peso">
                <h5>Peso: {weigth + " Kg"} </h5>
            </div>
           
        </div>
    )
}



// Imagen
// Nombre
// Temperamento
// Peso