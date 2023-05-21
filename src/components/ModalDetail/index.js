import React, { useState } from 'react';
import Modal from "react-modal";
//
import { toast } from 'react-toastify';
import { editOwner } from "services/artService";
import { useNavigate } from 'react-router-dom'

//

Modal.setAppElement("#root");

export default function ModalDetail({ art, isOpen, toggle, userId, newOwner }) {
    //
    //He quitado el idPiece que le pasabas, ya que el objeto art, al ser la pieza de arte ya contiene 
    //el id por lo que popdemos recuperarlo de alli con art.id
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const handleConfirm = (e) => {
        e.preventDefault()

        //Lo he pasado como objeto y despues en el servicio lo he transformado a json
        let data = {
            id: art.id,
            idUser: userId
        }

        setIsButtonDisabled(true);
        editOwner(data)
            .then(res => {
                if (res.ok) { //Si la respuesta es satisfactoria(Ha comprado la obra)
                    toastSuccess("¡Se ha realizado la compra de la obra!");
                    newOwner();
                    setTimeout(() => {
                        toggle(); //Cierra el modal
                    }, 1000);
                } else {
                    //Si hay error, muestra el error en el toast y cierra modal
                    toastError(res.data);
                    setTimeout(() => {
                        toggle();
                        setIsButtonDisabled(false);
                    }, 1000);
                }
                navigate('/artDetail/' + art.id);
            })
    }


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
                <button disabled={isButtonDisabled} onClick={(e) => handleConfirm(e)}>Confirmar</button>
            </Modal>
        </div>
    );
}


function toastSuccess(msg) {
    toast.success(msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
};

function toastError(msg) {
    toast.error(msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
};