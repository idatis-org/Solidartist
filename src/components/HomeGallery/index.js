import React, { useEffect, useState } from 'react';
import './HomeGallery.css';
import { getAllArt, getCurrentOwner } from 'services/artService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faImage, faHeadphones, faCamera, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const iconSwitch = (iconType) => {
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
}

export default function HomeGallery() {

    const navigate = useNavigate()
    const goToDetail = (e) => {
        navigate("/artDetail/" + e.currentTarget.value)
    }

    // Art_pieces Table
    const [artPiece, setArtPiece] = useState([])
    useEffect(() => {
        getAllArt()
            .then(setArtPiece)
            .catch(err => console.log(err))
    }, []);

    // Users_pieces Table
    const [currentOwner, setCurrentOwner] = useState([])
    useEffect(() => {
        getCurrentOwner()
            .then(setCurrentOwner)
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <h1>Home gallery</h1>
            <div className='homeGallery-container'>
                {
                    artPiece.slice().reverse().map((piece, idx) => (
                        <button key={idx} value={piece.id} onClick={e => goToDetail(e)}>
                            <div className="homeGallery-piece-container">
                                <h1>{piece.title}</h1>
                                <div>Foto obra: 
                                    {
                                        piece.piece_type === "image" ? <img src={`http://localhost:3030/imgArt/${piece && piece.content}`} width="50px" height="50px" alt="NFT" />
                                            : piece.content
                                    }
                                </div>
                                <div>Creator ID:  
                                    { 
                                        currentOwner.map((uPiece) => {
                                            if (piece.id === uPiece.id_piece) 
                                                return uPiece.id_creator;
                                        })
                                    }
                                </div>
                                <div>
                                { 
                                    currentOwner.map((uPiece) => {
                                        if (piece.id === uPiece.id_piece) {
                                            if (uPiece.id_creator === uPiece.id_current_owner) {
                                                return "Precio: " + piece.sell_price;
                                            } else {
                                                return "Precio: N/A. Esta obra de arte ya se ha vendido y no está a la venta";
                                            }
                                        }
                                    }) 
                                }
                                </div>
                                <div>
                                {
                                    iconSwitch(piece.piece_type)
                                }
                                </div>
                            </div>
                        </button> 
                    ))
                }
            </div>
        </>
    )
}