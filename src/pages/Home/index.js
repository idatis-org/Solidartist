import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()


    const goToProfile = () => {
        navigate("/test")
    }
    const goToDetail = (e) => {
        navigate("/artDetail/" + e.target.value)
    }

    return (
        <>
            HOME.
            <button onClick={goToProfile}>Go to TEST profile</button>
            
           {/*Borrar esto y agregar la galeria y pasar la funcion goToDetail 
           a las cards reemplazando el value por el ID*/}
           <br></br>
           <button value='1' onClick={e => goToDetail(e)}>Obra de arte 1</button> 
           <button value='2' onClick={e => goToDetail(e)}>Obra de arte 2</button> 
           <button value='3' onClick={e => goToDetail(e)}>Obra de arte 3</button> 
           <button value='4' onClick={e => goToDetail(e)}>Obra de arte 4</button> 
        </>
    );
}