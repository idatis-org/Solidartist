import GalleryArtist from 'components/GalleryArtist';
import GalleryBuyer from 'components/GalleryBuyer';
import React, { useEffect, useState } from 'react';
import { getProfile } from 'services/userService';
import useUser from 'hooks/useUser';

export default function Profile({ alias }) {
    const [userData, setUserData] = useState([])
    const { userInfo } = useUser()

    useEffect(() => {
        getProfile(alias)
            .then(setUserData)
            .catch(err => console.log(err))
    }, [alias])

    return (
        <>
            <p>PROFILE</p>
            <img src={`http://localhost:3030/img/${userData && userData.user_img}`} width="300px" alt="profile_photo" />
            <h1>Id: {userData.id}</h1>
            <h1>Username: {userData.username}</h1>
            <h1>Alias: {userData.alias}</h1>
            <h1>Description: {userData.description || "None"}</h1>
            <hr></hr>
            {
                userData.role === 1 && <GalleryArtist id={userData.id} />
            }
            {
                userData.role === 2 && !userData.profile_type && <GalleryBuyer id={userData.id} />
            }
            {
                userData.profile_type && <div>Usuario privado</div>
            }
            <hr></hr>

        </>
    )
}