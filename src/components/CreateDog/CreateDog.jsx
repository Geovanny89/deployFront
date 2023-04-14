
import React,{useState,useEffect} from "react";
// eslint-disable-next-line no-unused-vars
import { Link,useHistory } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {postDogs,getTemperament} from '../../redux/actions'
import { useDispatch,useSelector } from "react-redux";
import './CreateDog.css'

 function validate(input){
    let errors ={};
    
    if(!input.name)
        errors.name = 'Campo Obligatorio';
    else if(/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = 'Nombre no puede tener caracteres especiales o tildes'

    if(!input.minHeight) errors.minHeight='La Altura es requerida'
    else if(/[^0-9 ]+/g.test(input.minHeight)) errors.minHeight='La altura valida es en numeros'
    else if(/[^0-9 ]+/g.test(input.minHeight) > (input.maxHeight)) errors.minHeight = 'La altura mínima no puede ser mayor que la altura maxima'

    if(!input.maxHeight) errors.maxHeight='La Altura es requerida'
    else if(/[^0-9 ]+/g.test(input.minWeigth)) errors.minWeigth = 'El peso valido es en numeros'
    else if(parseInt(input.maxHeight) < parseInt(input.minHeight)) errors.maxHeight = 'La altura maxima no puede ser menor que la altura mínima'
    
    
    if(!input.minWeigth) errors.minWeigth= 'El Peso es obligatorio'
    else if(/[^0-9 ]+/g.test(input.minWeigth)) errors.minWeigth = 'El peso valido es en numeros'
    else if(parseInt(input.minWeigth)>(input.maxWeigth)) errors.minWeigth = 'El peso minimo no puede ser mayor que el peso maximo'

    if(!input.maxWeigth) errors.maxWeigth= 'El Peso es obligatorio'
    else if(/[^0-9 ]+/g.test(input.maxWeigth)) errors.maxWeigth = 'El peso valido es en numeros'
    else if(parseInt(input.maxHeight)<(input.minWeigth)) errors.maxWeigth = 'El peso Maximo no puede ser menor que el peso minimo'

    if(!input.minlife_span) errors.minlife_span='La Esperanza de vida es un dato Obligatorio'
    else if(/[^0-9 ]+/g.test(input.minlife_span)) errors.minlife_span = 'La esperanza de vida debe ir en numeros'
    else if(parseInt(input.minlife_span)>(input.maxlife_span)) errors.minlife_span  = 'La esperanza minima de vida no puede ser mayor a la esperanza maxima'
    
    if(!input.image)errors.image='La url no puedes estar vacia'

    if(!input.maxlife_span) errors.maxlife_span='La Esperanza de vida es un dato Obligatorio'
    else if(/[^0-9 ]+/g.test(input.maxlife_span)) errors.maxlife_span = 'La esperanza de vida debe ir en numeros'
    else if(parseInt(input.maxlife_span)< parseInt(input.minlife_span))errors.maxlife_span = 'La esperanza maxima de vida no puede ser menor a la esperanza minima'
    return errors;
};
 
export default function DogCreate(){
    
    const dispatch =useDispatch()
    // eslint-disable-next-line no-unused-vars
   const history = useHistory()
    const temperamentAll = useSelector((state)=>state.allTemperament)

    const [errors, setErrors]=useState({});

    // eslint-disable-next-line no-unused-vars
    const [input,setInput]= useState({
        name:" ",
        minHeight:" ",
        maxHeight:" ",
        maxWeigth:" ",
        minWeigth:" ",
        image:" ",
        minlife_span:" ",
        maxlife_span:" ",
        temperament:[]
      
    })

    // eslint-disable-next-line no-unused-vars
    function handleChange(e){

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        })); 
       
       // console.log(input)
    }
    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        if(input.name === " " || input.maxHeight===" " || input.maxHeight ===" " || input.minWeigth===" " || input.maxWeigth===" "
        || input.minlife_span ===" " || input.maxlife_span ===" " || input.image===" "){
            return alert('complete el formulario')
        }
        let crear = {
            name: input.name,
            height: `${input.minHeight}-${input.maxHeight}`,
            weigth: `${input.minWeigth}-${input.maxWeigth}`,
            life_span: `${input.minlife_span}-${input.maxlife_span} years`,
            image: input.image,
            temperament: input.temperament.join(", "),
          };
          
        dispatch(postDogs(crear))
        
        setInput({
            name:" ",
            minHeight:" ",
            maxHeight:" ",
            maxWeigth:" ",
            minWeigth:" ",
            minlife_span:" ",
            maxlife_span:" ",
            image:" ",
            temperament:[]
        })
        alert("Genial !!! haz creado tu Perro!")
      history.push('./home')
    }
    function handleDelete(el){
       setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== el)
        }) 
    } 

    useEffect(()=> {
        dispatch(getTemperament());
        console.log(getTemperament)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return(
        <div className="form">
            <Link to= '/home'> <button> Volver</button></Link>
            <h1>Crear Perro</h1>
            <div >
            <form onSubmit={(e)=>handleSubmit(e)} >
                <div className="name" >
                    <label>Nombre: </label>
                    <input type="text"
                    placeholder="Nombre" 
                    value={input.name} 
                    name="name" 

                    onChange={(e)=>handleChange(e)}
                    />
                    <div className="error1">
                     {errors.name && (<p >{errors.name}</p>)}
                    </div>
                    <div className="altura">
                        <h3>Altura</h3>
                    </div>
                <div className="opcion">
                    <label>Mínima</label>
                    <input type="text" 
                    placeholder="ingresa el valor" 
                    value={input.minHeight} 
                    name="minHeight" onChange={(e)=>handleChange(e)}/>
                    <div className="error1">
                         {errors.minHeight && (<p >{errors.minHeight}</p>)}
                    </div>
                  
                    <label>Máxima </label>
                    <input type="text" 
                    placeholder="ingresa el valor" 
                    value={input.maxHeight} 
                    name="maxHeight" onChange={handleChange}/>
                    <div className="error1">
                    {errors.maxHeight && (<p >{errors.maxHeight}</p>)}
                    </div>
                </div>
                <div className="peso">
                    <h3>Peso</h3>
                </div>
                <div className="opcionPeso">
                    <label>Mínimo</label>
                    <input type="text" 
                    value={input.minWeigth} 
                    name="minWeigth" onChange={handleChange}
                    placeholder="ingresa el valor"/>
                    <div className="error1">
                    {errors.minWeigth && (<p >{errors.minWeigth}</p>)}  
                    </div>
                    
                    <label>Máximo</label>
                    <input type="text" 
                    value={input.maxWeigth} 
                    name="maxWeigth" onChange={handleChange}
                    placeholder="ingresa el valor"/>
                    <div className="error1">
                    {errors.maxWeigth && (<p >{errors.maxWeigth}</p>)}
                    </div>
                    
                </div> 
                <div className="frase">
                    <h3>Expectativa de vida</h3>
                </div>
                      
                <div className="lifes">
                    <label>Mínima</label>
                    <input type="text" 
                    value={input.minlife_span} 
                    name="minlife_span" onChange={handleChange}
                    placeholder="ingresa el valor"/>
                    <div className="error1">
                        {errors.minlife_span && (<p >{errors.minlife_span}</p>)}
                    </div>
                    <label>Máxima</label>
                    <input type="text" 
                    value={input.maxlife_span}
                    name="maxlife_span" onChange={handleChange}
                    placeholder="ingresa el valor"/>
                    <div className="error1">
                     {errors.maxlife_span && (<p >{errors.maxlife_span}</p>)}
                    </div>
                </div> 
                <div>
                    <label>Imagen</label>
                    <input type="text" 
                    name="image" onChange={handleChange}
                    placeholder="ingresa el valor"/>
                     <div className="error1">
                     {errors.image && (<p >{errors.image}</p>)}
                    </div>
                </div>    
               <div className="tempera">
                <select onChange={(e)=>handleSelect(e)}>
                    <option >Temperamento</option>
                    {
                        temperamentAll?.map((t) =>(
                           
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))
                    }
                   
                </select>
                <button  type="submit">Crear Perro</button>
                </div>
                </div>
            </form>
            </div>
            {input.temperament?.map(el =>
            
                <div className="button">
                    <button className="botonX" name={el} onClick={()=> handleDelete(el)}>X</button>
                    <p key={el.id}>{el}</p> 
                    
                </div>
                )} 
        </div>
    )
}   