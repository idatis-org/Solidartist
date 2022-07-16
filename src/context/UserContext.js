import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { getProfile } from 'services/userService';

const Context = React.createContext({})

export function UserContextProvider({ children }) {
    const [token, setToken] = useState(() => window.sessionStorage.getItem('token'))
    const [userInfo, setUserInfo] = useState({
        id: null,
        username: '',
        role: null,
        alias: '',
        profile_type: false,
        user_img: '',
        profile_img: '',
        description: '',
        creation_date: null
    })

    console.log(userInfo)

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token);
            getProfile(decoded.alias)
                .then(res => {
                    setUserInfo({
                        id: res.id,
                        username: res.username,
                        role: res.role,
                        alias: res.alias,
                        profile_type: res.profile_type,
                        user_img: res.user_img,
                        profile_img: res.profile_img,
                        description: res.description,
                        creation_date: res.creation_date
                    })
                })
                .catch((err) => console.log(err))
        }
    }, [token])


    return <Context.Provider value={{ token, setToken, userInfo }}>
        {children}
    </Context.Provider>

}

export default Context;