import React, { useEffect, useState } from 'react';
import { getProfile } from 'services/userService';

export default function Profile({ alias }) {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        getProfile(alias)
            .then(setUserData)
            .catch(err => console.log(err))
    }, [alias])

    console.log(userData)

    return (
        <>
            PROFILE
            <h1>Id: {userData.id}</h1>
            <h1>Username: {userData.username}</h1>
            <h1>Alias: {userData.alias}</h1>
            <h1>Description: {userData.description || "None"}</h1>
        </>
    )
}