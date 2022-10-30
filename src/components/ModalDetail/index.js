import React from 'react';
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalDetail({ art, isOpen, toggle }) {
    return (
        <div className=''>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggle}>
                {
                    art && (
                        <>
                            <div>
                                {
                                    art.piece_type === "image" ? <img src={`https://pruebas-api.solidartist.org/imgArt/${art && art.content}`} width="100px" height="100px" alt="NFT" />
                                        : <img src={process.env.PUBLIC_URL + '/defaultArtPicture.jpg'} width="100px" height="100px" />
                                }
                            </div>
                            <div>title: {art.title}</div>
                            <div>price: {art.sell_price}</div>
                        </>
                    )
                }
                <button onClick={toggle}>Confirmar</button>
            </Modal>
        </div>
    );
}