import React, { useEffect, useState } from 'react';
import './HomeGallery.css';
import { getAllArt } from 'services/artService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const renderIconSwitch = (iconType) => {
    switch(iconType) {
        case 'audio':
            return <FontAwesomeIcon icon={faHeadphones}/>;
        case 'photo':
            return <FontAwesomeIcon icon={faCamera}/>;
        case 'Music':
            return <FontAwesomeIcon icon={faMusic}/>;
        case 'image':
            return <FontAwesomeIcon icon={faImage}/>;
        default:
            return <FontAwesomeIcon icon={faCircleExclamation}/>;
    }
};

export default function HomeGallery() {

    const [artPiece, setArtPiece] = useState([])
    useEffect(() => {
        getAllArt()
            .then(setArtPiece)
            .catch(err => console.log(err))
    }, []);

    console.log('PRUEBA')

    return (
        <>
            <h1>Home gallery</h1>
            <div className='gallery-container'>
                {
                    artPiece.slice().reverse().map((piece, idx) => (
                        <div key={idx} className="gallery-piece-container">
                            <h1>{piece.title}</h1>
                            <div>
                            {piece.content}
                                {
                                    piece.piece_type === "image" ? <img src={`http://localhost:3030/imgArt/${piece && piece.content}`} width="50px" height="50px" alt="NFT" />
                                        : piece.content
                                }
                            </div>
                            <div>
                                <p>Precio: {piece.sell_price}</p>
                            </div>
                            <div>
                                {renderIconSwitch(piece.piece_type)}
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}