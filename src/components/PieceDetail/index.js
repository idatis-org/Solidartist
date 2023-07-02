import React, { useState, useEffect } from 'react';
import { getPieceById, getCollectionById, getCategoriesById, getPieceAssociatedUsers, deleteArtById } from 'services/artService';
import { getUserById } from 'services/userService';
import { useNavigate } from 'react-router-dom';
import useUser from 'hooks/useUser';
import ModalDetail from 'components/ModalDetail';
import ButtonDesplegable from 'components/ButtonDesplegable';


export default function PieceDetail({ idPiece }) {
    const [artPiece, setArtPiece] = useState(null)
    const [categoriesPiece, setCategoriesPiece] = useState([])
    const [collection, setCollection] = useState();
    const [users, setUsers] = useState(null);
    const [owner, setOwner] = useState(null);
    const [creator, setCreator] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(false);

    //Confirmation Modal
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const { isLogged } = useUser();

    //Service Calls
    useEffect(() => {
        getPieceById(idPiece)
            .then(setArtPiece)
            .catch(err => console.log(err));

        // GET OWNER AND CREATOR
        getPieceAssociatedUsers(idPiece)
            .then(setUsers)
            .catch(err => console.log(err));

        //GET CATEGORY IT BELONGS
        getCategoriesById(idPiece)
            .then(setCategoriesPiece)
            .catch(err => console.log(err));

        console.log("useEffect is called:  Service Calls");
    }, [forceUpdate]);

    useEffect(() => {
        //GET COLLECTION IT BELONGS
        if (users) {
            getUserById(users.id_creator)
                .then(setCreator)
                .catch(err => console.log(err));

            getUserById(users.id_current_owner)
                .then(setOwner)
                .catch(err => console.log(err));
        }
        console.log("useEffect is called:  GET COLLECTION IT BELONGS");
    }, [users, forceUpdate])


    //Editando 
    const { userInfo } = useUser()
    const userId = userInfo.id;
    const username = userInfo.username;
    //Fin editando

    useEffect(() => {
        //GET COLLECTION IT BELONGS
        if (artPiece) {
            getCollectionById(artPiece.id_collection)
                .then(setCollection)
                .catch(err => console.log(err));
        }
        console.log("useEffect is called:  GET COLLECTION IT BELONGS");
    }, [artPiece, forceUpdate])

    useEffect(() => {
        retrieveOwner();
        console.log("useEffect is called:  retrieveOwner");
    }, [owner, forceUpdate])

    function retrieveOwner() {
        if (owner && owner.profile_type === true) {
            owner.username = "Anónimo";
        }
    }

    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    }
    const newOwner = () => {
        setForceUpdate(!forceUpdate);
        console.log(forceUpdate);
    }


    if (artPiece && owner && creator && owner.username !== creator.username) {
        artPiece.sell_price = "Obra vendida";

    }
    const isMyArt = (artPiece && owner && owner.username !== username);

    const isVendida = () => {
        let btn;

        if (artPiece && artPiece.sell_price !== "Obra vendida" && isMyArt) {
            isLogged ?
                btn = <button value={idPiece} onClick={e => toggleModal()}>Comprar</button>
                :
                btn = <button value={idPiece} onClick={e => goToLogin(e)}>Comprar(Login)</button>
        } else {
            isMyArt ?
                btn = <button disabled>Vendida</button>
                :
                btn = <button disabled>Propia</button>
        }
        return btn;
    }

    const isVendidaRender = isVendida();
    
    /*Funciones para accionar el boton desplegable de opciones*/ 
    const handleDeleteClick = () => {
        deleteArtById(idPiece)
          .then((res) => {
            console.log(res);
            // Recargar la página automaticamente
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      };

      const handleEditClick = () => {
        console.log('Editar');
       
      };

    return (
        <div className=''>
            {
                artPiece && (
                    <>
                        <div> ID del producto es {idPiece}</div>
                        <div>
                            {
                                artPiece.piece_type === "image" ? <img src={`https://pruebas-api.solidartist.org/imgArt/${artPiece && artPiece.content}`} width="100px" height="100px" alt="NFT" />
                                    : <img src={process.env.PUBLIC_URL + '/defaultArtPicture.jpg'} width="100px" height="100px" />
                            }


                        </div>
                        
                        <ButtonDesplegable
                        /*Botton Desplegable borrar y editar obra*/
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />

                        <div>creator: {creator && creator.username}</div>
                        <div>owner: {owner && owner.username}</div>
                        <div>title: {artPiece.title}</div>
                        <div>description: {artPiece.description}</div>
                        <div>creation date: {artPiece.creation_date ? new Date(artPiece.creation_date).toLocaleDateString() : 'N/A'}</div>
                        <div>price: {artPiece.sell_price}</div>
                        <div>category:
                            {categoriesPiece && categoriesPiece.map((cat) => (
                                <p>{cat.title}</p>
                            ))}
                        </div>
                        <div>colection: {collection ? collection.name : "La obra no esta ninguna colección"}</div>
                    </>
                )
            }
            <ModalDetail isOpen={isOpen} art={artPiece} toggle={toggleModal} owner={retrieveOwner} userId={userId} newOwner={newOwner}></ModalDetail>
            {isVendidaRender}
        </div>
    );
}
