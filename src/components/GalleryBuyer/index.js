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
            {
                artOwner.map((piece, idx) => (
                    <div key={idx}>
                        <h3>{piece.title}</h3>
                        <div>
                            {piece.content}
                        </div>
                    </div>
                ))
            }

        </>
    )
}