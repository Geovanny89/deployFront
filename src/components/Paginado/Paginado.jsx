/* eslint-disable array-callback-return */
import React from "react";
import './Paginado.css'

export default function Paginado({dogsPorPage,allDogs,paginado}){
    const pageNumbers= []

    for(let i= 0; i<=Math.ceil(allDogs/dogsPorPage)-1;i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav className="barra">
            <ul>
                {pageNumbers && 
                pageNumbers.map(number =>(
                    <li className="number" key={number}>
                        <button onClick={()=> paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}