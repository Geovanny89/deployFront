/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link,useParams,useHistory} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, Clear,deleteDog } from "../../redux/actions";
import'./Detail.css'

export default function Detail(){
    const { id }= useParams();
    const dogDetail = useSelector((e)=>e.detail);
    console.log(dogDetail);
    const dispatch = useDispatch();
    const history =useHistory();


    useEffect(() => {
        dispatch(getDetail(id));
        dispatch(Clear());
    }, [dispatch, id]);
    
   
      function handleDeleteDog() {
        dispatch(deleteDog(id));
        alert("Dog deleted succesfully");
        history.push("/home");
    }

    return (
        <div className="detalle">
          

            <div className="volver">
                <Link to= "/home">
                    <button>Volver</button>
                </Link>
                <div>
               {
                  dogDetail.createInDb && <button onClick={handleDeleteDog}>Delete</button>
               }
              
               
             </div>
                {dogDetail.length > 0 ?
                 (
                <main >
                    
                    <div className="informacion">
                        <div className="nombre">
                            <h1>{dogDetail[0].name}</h1>
                        </div>
                        <div className="image">                        
                        <img src={dogDetail[0].image} alt= "Imagen Not found"/>
                    </div>
                        <div className="tempe">
                            <h4>Temperamento:</h4>
                            <p>{dogDetail[0].temperament}</p>
                        </div>
                        <div className="info">
                            <div className="altura">
                            <h4>Altura: </h4>
                                <p>{dogDetail[0].height  + " Cms "}</p>
                            </div>
                            <div className="pes"> 
                            <h4> Peso: </h4>
                                <p>{dogDetail[0].weigth + " Kg "}</p>
                            </div>
                            
                        </div>
                        <div className="life">
                         <h4>Esperanza de Vida: </h4>
                            <p>{dogDetail[0].life_span}</p>  
                        </div>
                    
                    </div>
                </main>
                ) : (
                    <p>Loading...</p>
                )}
               
                    
            </div>
        </div>
    )
}