import React, { useState, useEffect } from 'react';
import { getOwnerArt, getCreatorArt } from 'services/userService';
import { useNavigate } from 'react-router-dom'
import './GalleryUser.css';

export default function GalleryUser({ id, type }) {
    const [artOwner, setOwner] = useState([])
    const [artArtist, setArtArtist] = useState([])

    const navigate = useNavigate();

    const title = type != null && type === "BUYER" ? "ART THAT I OWN" : "ART THAT I CREATED";
    console.log(artOwner);

    function goToProfile(id) {
        navigate('/artDetail/' + id)
    }

    useEffect(() => {
        if (type === "BUYER") {
            getOwnerArt(id)
                .then(setOwner)
        } else if (type === "ARTIST") {
            getCreatorArt(id)
                .then(setArtArtist)
        }

    }, [id])

    function whoIsArt() {
        if (type === "BUYER") {
            return artOwner;
        } else if (type === "ARTIST") {
            return artArtist;
        }
    }

    return (
        <>
            <h1>{title}</h1>
            <div className='gallery-container'>
                {whoIsArt() &&
                    whoIsArt().map((piece, idx) => (
                        <div key={idx} className="gallery-piece-container" onClick={() => goToProfile(piece.id)}>
                            <h1>{piece.title}</h1>
                            <div>
                                {
                                    piece.piece_type === "image" ? <img src={`https://pruebas-api.solidartist.org/imgArt/${piece && piece.content}`} width="200px" height="200px" alt="NFT" />
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