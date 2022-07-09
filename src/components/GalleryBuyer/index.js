import React, { useState, useEffect } from 'react';
import { getOwnerArt } from 'services/userService';


export default function GalleryBuyer({ id }) {
    const [artOwner, setOwner] = useState([])

    useEffect(() => {
        getOwnerArt(id)
            .then(setOwner)
    }, [id])

    return (
        <>
            <h1>ART THAT I OWN</h1>
            <div className='gallery-container'>
                {
                    artOwner.map((piece, idx) => (
                        <div key={idx} className="gallery-piece-container">
                            <h1>{piece.title}</h1>
                            <div>
                                {piece.content}
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}