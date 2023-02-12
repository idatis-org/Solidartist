import React, { useCallback, useState } from 'react';
import useUser from 'hooks/useUser'
import GalleryBuyer from 'components/GalleryUser';
import { Form, Button } from 'react-bootstrap';
import useForm from './hook'
import { editProfile } from 'services/userService';
import UploadArt from 'components/UploadArt';
import Collection from 'components/Collection';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';


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



export default function Dashboard() {
    const { userInfo, updateProfileInfo } = useUser()
    const [show, setShow] = useState(false);
    const [showCollection, setShowCollection] = useState(false);
    const navigate = useNavigate();

    //Initial states of the reducer
    const initialProfilePhoto = userInfo && userInfo.user_img;
    const initialWallPhoto = userInfo && userInfo.profile_img;
    const initialDesc = userInfo && userInfo.description;
    const initialPriv = userInfo && userInfo.profile_type;

    //Hook where the reducer is located
    const { profilePhoto,
        wallPhoto,
        description,
        privacity,
        updateProfilePhoto,
        updateWallPhoto,
        updateDescription,
        updatePrivacity } = useForm(initialProfilePhoto, initialWallPhoto, initialDesc, initialPriv)

    //Call of dispatch methods defined in the hook to update the states

    const handleProfilePhoto = useCallback((evt) => {
        const image = evt.target.files[0];
        new Compressor(image, {
            quality: 0.95,
            //maxWidth: 1200,
            //maxHeight: 2160,
            success(result) {
                updateProfilePhoto(result)
            },
        });
    }, [updateProfilePhoto]);

    const handleWallPhoto = useCallback((evt) => {
        updateWallPhoto(evt.target.files[0])
    }, [updateWallPhoto])

    const handleDescription = useCallback((evt) => {
        updateDescription(evt.target.value)
    }, [updateDescription])

    const handlePrivacity = useCallback((evt) => {
        updatePrivacity(evt.target.checked)
    }, [updatePrivacity])

    //Submit function that calls the service and sends the data to it
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(privacity)

        const data = new FormData()
        data.append("files", profilePhoto)
        data.append("files", wallPhoto)
        data.append("id", userInfo.id)
        data.append('description', description);
        data.append('profile_type', privacity);

        editProfile(data)
            .then(res => {
                if (res.ok) {
                    toastSuccess("¡Se ha editado correctamente!");
                    updateProfileInfo();
                    setTimeout(() => {
                        navigate('/' + userInfo.alias, { replace: true })
                    }, 1500);
                }
            })
    }

    const goToUserDetail = () =>{
        navigate('/' + userInfo.alias, { replace: true })
    }

    return (
        <>
            <h1>Dashboard</h1>
            <Form encType='multipart/form-data'>
                <Form.Label htmlFor="upload-photo-profile" className=''>
                    Foto Perfil
                </Form.Label>
                <img src={`https://pruebas-api.solidartist.org/img/${initialProfilePhoto}`} width="200px" height="200px" alt="NFT" />
                <Form.Control type="file" name="fileProfile" id="upload-photo-profile" onChange={(e) => { handleProfilePhoto(e) }} />

                <Form.Label htmlFor="upload-photo-wall" className=''>
                    Foto Muro
                </Form.Label>
                <Form.Control type="file" name="fileWall" id="upload-photo-wall" onChange={(e) => { handleWallPhoto(e) }} />

                <Form.Group className="perfilname" controlId="formBasicEmail">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="textarea" placeholder="Description" value={description} onChange={(e) => { handleDescription(e) }} />
                </Form.Group>
                {
                    userInfo.role === 1 ?
                        <>
                            <Button onClick={() => setShow(true)}>Subir obra</Button>
                            <UploadArt show={show} onHide={() => setShow(false)} idUser={userInfo.id} toast={toastSuccess} />
                            <Button onClick={() => setShowCollection(true)}>Crear colección</Button>
                            <Collection show={showCollection} onHide={() => setShowCollection(false)} idUser={userInfo.id} toast={toastSuccess}></Collection>

                        </>
                        :
                        userInfo.role === 2 ?
                            <>
                                <GalleryBuyer />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Privado"
                                    value={privacity}
                                    onChange={(e) => { handlePrivacity(e) }}
                                />
                            </> :
                            null
                }
                <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
                <Button onClick={() => goToUserDetail()}>Mis Obras</Button>
            </Form>
        </>
    )
}