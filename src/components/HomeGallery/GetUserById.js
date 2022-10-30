import React, { useEffect, useState } from 'react';
import { getUserById } from 'services/userService';

// AUXILIARY COMPONENT FINDS A USER BY ID AND RETURNS HIS PROFILE PICTURE
export default function GetUserById({id, idx}) {

    const [userData, setUserData] = useState([])
    useEffect(() => {
        getUserById(id)
            .then(setUserData)
            .catch(err => console.log(err))
    }, [id]);

    return (
        <React.Fragment key={idx}>
            Foto perfil: 
            {userData.user_img === null ? <img src={process.env.PUBLIC_URL + '/defaultUserPicture.jpg'} width="50px" height="50px"/>
                : <img src={`https://pruebas-api.solidartist.org/img/${userData && userData.user_img}`} width="50px" alt="profile_photo" />
            }          
        </React.Fragment>
    )
}

