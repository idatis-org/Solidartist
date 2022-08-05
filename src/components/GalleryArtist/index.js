import React, { useEffect, useState } from 'react';
import { getCreatorArt } from 'services/userService';
import './GalleryArtist.css'

export default function GalleryArtist({ id }) {
    const [artArtist, setArtArtist] = useState([])

    useEffect(() => {
        getCreatorArt(id)
            .then(setArtArtist)
    }, [id])

    return (
        <>
            <h1>ART THAT I CREATED</h1>
            <div className='gallery-container'>
                {
                    artArtist.map((piece, idx) => (
                        <div key={idx} className="gallery-piece-container">
                            <h1>{piece.title}</h1>
                            <div>
                                {
                                    piece.piece_type === "image" ? <img src={`http://localhost:3030/imgArt/${piece && piece.content}`} width="200px" height="200px" alt="NFT" />
                                        : piece.content
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}