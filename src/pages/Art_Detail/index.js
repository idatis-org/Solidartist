import React, { useEffect, useState } from 'react';
import "./Art_Detail.css"

export default function Art_Detail(creator, owner, title, description, price, category, colection) {


    return (
        <div className=''>
            <div>creator</div>
            <div>owner</div>
            <div>title</div>
            <div>description</div>
            <div>price</div>
            <div>category</div>
            <div>colection</div>
            <button>Comprar</button>
        </div>
    )
}