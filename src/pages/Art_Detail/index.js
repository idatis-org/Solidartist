import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./Art_Detail.css"

export default function Art_Detail() {
    let { id } = useParams();
  

    return (
        <div className=''>
            <div> ID del producto es {id}</div>
            <div>creator</div>
            <div>owner</div>
            <div>title</div>
            <div>description</div>
            <div>price</div>
            <div>category</div>
            <div>colection</div>
            <button className=''>Comprar</button>
        </div>
    )
}