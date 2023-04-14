import React from "react";
import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { getNameDogs,getDogs } from "../../redux/actions";
import './SearcBar.css'

// 
export default function SearchBar(){
   
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch= useDispatch()
    
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name,setName]=useState("")
    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);
 
    
    function handleInputChange(e){
        dispatch(getNameDogs(e))  

    }
  
    return(
        <div className="buscar">
            <input class="form-control mr-sm-2" type="search" value={name} placeholder="Buscar" aria-label="Search" onChange={(e)=>{setName(e.target.value); handleInputChange(e.target.value)}}></input>
        </div>
    )
}
