import React, { useEffect, useState } from 'react';
import { getCreatorArt } from 'services/userService';

export default function GalleryArtist({ id }) {
    const [artArtist, setArtArtist] = useState([])

    useEffect(() => {
        getCreatorArt(id)
            .then(setArtArtist)
    }, [id])

    return (
        <>
            <h1>ART THAT I CREATED</h1>

            {
                artArtist.map((piece, idx) => (
                    <div key={idx}>
                        <h1>{piece.title}</h1>
                        <div>
                            {piece.content}
                        </div>
                    </div>
                ))
            }

        </>
    )
}