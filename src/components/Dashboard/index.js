import React, { useCallback, useState } from 'react';
import useUser from 'hooks/useUser'
import GalleryBuyer from 'components/GalleryBuyer';
import { Form, Button } from 'react-bootstrap';
import useForm from './hook'
import { editProfile } from 'services/userService';
import UploadArt from 'components/UploadArt';

export default function Dashboard() {
    const { userInfo } = useUser()
    const [show, setShow] = useState(false);

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
        updateProfilePhoto(evt.target.files[0])
    }, [updateProfilePhoto])

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
            .then(res => console.log(res))
    }

    return (
        <>
            <h1>Dashboard</h1>
            <Form encType='multipart/form-data'>

                <Form.Label htmlFor="upload-photo-profile" className=''>
                    Foto Perfil
                </Form.Label>
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
                            <UploadArt show={show} onHide={() => setShow(false)} idUser={userInfo.id} />
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
            </Form>
        </>
    )
}