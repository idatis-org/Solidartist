import GalleryUser from 'components/GalleryUser';
import ReportForm from 'components/ReportForm';
import React, { useEffect, useState } from 'react';
import { getProfile } from 'services/userService';
import useUser from 'hooks/useUser';

export default function Profile({ alias }) {
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { userInfo, isLogged } = useUser()
    const userType = ['ARTIST', 'BUYER'];

    useEffect(() => {
        getProfile(alias)
            .then(setUserData)
            .catch(err => console.log(err))
    }, [alias])

    const handleClick = () => {
        setShowModal(true);
    }

    return (
        <>
            {isLogged && userInfo.id != userData.id ? <ReportForm show={showModal} onHide={() => setShowModal(false)} user={userInfo} reportedUser={userData} /> : ""}
            <p>PROFILE</p>
            {isLogged && userInfo.id != userData.id ? <button onClick={() => handleClick()}>Reportar usuario</button> : ""}
            <img src={`https://pruebas-api.solidartist.org/img/${userData && userData.user_img}`} width="300px" alt="profile_photo" />
            <h1>Id: {userData.id}</h1>
            <h1>Username: {userData.username}</h1>
            <h1>Alias: {userData.alias}</h1>
            <h1>Description: {userData.description || "None"}</h1>
            <hr></hr>
            {
                userData.role === 1 && <GalleryUser id={userData.id} type={userType[0]} />
            }
            {
                userData.role === 2 && !userData.profile_type && <GalleryUser id={userData.id} type={userType[1]} />
            }
            {
                userData.profile_type && <div>Usuario privado</div>
            }
            <hr></hr>

        </>
    )
}