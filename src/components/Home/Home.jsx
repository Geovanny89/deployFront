/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs,filterCreated,orderByName,filterTemperament,getTemperament,orderPeso } from "../../redux/actions";
import {Link} from 'react-router-dom'
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css'

export default function Home(){
    const dispatch = useDispatch()
    const allDogs= useSelector ((state) => state.dogs)
    const temperamentAll = useSelector((state)=>state.allTemperament)

// PAGINADO 
    const [order,setOrder]=useState(''); // estado local que inicia vacio
    const [currentPage, setCurrentPage]=useState(1)//pagina actual que arranca en 1
    const [dogsPorPage, setDogsPorPage]= useState(12) // muestro 8 raza de dogs por pagina
    const indexOfLastDogs= currentPage * dogsPorPage //8 razas de perros
    const indexOfFirstDogs = indexOfLastDogs - dogsPorPage //
    const currentDogs = allDogs.slice(indexOfFirstDogs,indexOfLastDogs,)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(getDogs()) //me despacha todos los perros 
        dispatch(getTemperament())// me despacha todos los temperamentos
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleFIlterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    function handleFilterAsc(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)// lo seteo en la primera pagina
        setOrder(`Ordenado ${e.target.value}`)
       // setCurrentPage(1);
    }
    function handleFilterTemperament(e){
        dispatch(filterTemperament(e.target.value))
    }

    // ordenamiento por peso 
    function handleOrderPeso(e){
        e.preventDefault();
        dispatch(orderPeso(e.target.value));
       setOrder(`Ordenado ${e.target.value}`);
      };

    return (
        <div className="conten">
            <div className="crear">
                <h1>Dogs App</h1>                
            </div>        
           
            <div>
            
            <div className="navi">
            <button className="cargar" onClick={e=> {handleClick(e)}}>
                Cargar todos los Perros
                </button>
                <select className="por" onChange={e=>handleFilterAsc(e)}>
                    <option value="All">Ordenar por</option>
                    <option value="Asc">A-Z</option>
                    <option value="Des">Z-A</option>
                </select>
               
                <select onChange={e=>handleFIlterCreated(e)}>
                    <option value="All">Filtar por</option>
                    <option value="exis">Creados</option>
                    <option value="raza">Existentes</option>
                </select>
                <select onChange={e=>handleOrderPeso(e)}>
                    <option value="All">Peso</option>
                    <option value="small">Pequeño </option>
                    <option value="big">Grande</option>
                </select>
                <select onChange={e=>handleFilterTemperament(e)}>
                    
                    <option value="Todos">Temperamentos</option>
                    {
                       temperamentAll.map(e=>(
                            <option defaultValue="message" key={e.id} value={e.name}>{" "}{e.name}</option> 
                            // defaultValue para quitar error en consola del option
                        ))
                    }
                </select> 
                <div className="boton-crear">
                <Link to='/dogsCreate'><button>Crear Dog</button></Link>
                </div>
                </div>
   
                <Paginado
                dogsPorPage={dogsPorPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                <SearchBar currentPage={setCurrentPage}/>
                
                {
                    currentDogs?.map((e) =>{
                        return (
                            <Link key={e.id} to='/home' >
                                <div className="contenido">
                                <Card name={e.name} temperament={e.temperament} weigth={e.weigth} image={e.image} id={e.id}/>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    )
}