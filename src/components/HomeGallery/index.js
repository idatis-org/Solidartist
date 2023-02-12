import React, { useEffect, useState } from 'react';
import './HomeGallery.css';
import { getAllArt, getCurrentOwner } from 'services/artService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faImage, faHeadphones, faCamera, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import GetUserById from './GetUserById';
import LoadingSpinner from 'components/LoadingSpinner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Icon switch in order to change icons import and replace here
const iconSwitch = (iconType) => {
    switch (iconType) {
        case 'audio':
            return <FontAwesomeIcon icon={faHeadphones} />;
        case 'photo':
            return <FontAwesomeIcon icon={faCamera} />;
        case 'Music':
            return <FontAwesomeIcon icon={faMusic} />;
        case 'image':
            return <FontAwesomeIcon icon={faImage} />;
        default:
            return <FontAwesomeIcon icon={faCircleExclamation} />;
    }
}

export default function HomeGallery() {
    const [isLoading, setIsLoading] = useState(false);
    // Navigates to the details of the piece
    const navigate = useNavigate()
    const goToDetail = (e) => {
        navigate("/artDetail/" + e.currentTarget.value)
    }

    // Table - Art_pieces - Gets all art pieces
    const [artPiece, setArtPiece] = useState([])
    useEffect(() => {
        setIsLoading(true);
        getAllArt()
            .then((res) => {
                setArtPiece(res);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }, []);

    // Table - Users_pieces - Used to find the current owner of a piece
    const [currentOwner, setCurrentOwner] = useState([])
    useEffect(() => {
        getCurrentOwner()
            .then(setCurrentOwner)
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <h1>Gallery</h1>
            {isLoading ? <LoadingSpinner /> :
                <div className='homeGallery-container'>
                    {
                        artPiece.slice().reverse().map((piece, idx) => (
                            <button key={idx} value={piece.id} onClick={e => goToDetail(e)}>
                                <div className="homeGallery-piece-container">
                                    <h1>{piece.title}</h1>
                                    <div>Foto obra:
                                        {
                                            piece.piece_type === "image" ? <LazyLoadImage src={`https://pruebas-api.solidartist.org/imgArt/${piece && piece.content}`} width="50px" height="50px" alt="NFT" loading="lazy"/>
                                                : <img src={process.env.PUBLIC_URL + '/defaultArtPicture.jpg'} width="50px" height="50px" />
                                        }
                                    </div>
                                    <div>
                                        {
                                            currentOwner.map((uPiece) =>
                                                piece.id === uPiece.id_piece ? <GetUserById id={uPiece.id_creator} key={idx}></GetUserById> : null)
                                        }
                                    </div>
                                    <div>
                                        {
                                            currentOwner.map((uPiece) =>
                                                piece.id === uPiece.id_piece ?
                                                    uPiece.id_creator === uPiece.id_current_owner ? "Precio: " + piece.sell_price
                                                        : "Precio: N/A. Esta obra de arte ya se ha vendido y no está a la venta"
                                                    : null)
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
            }
        </>
    )
}