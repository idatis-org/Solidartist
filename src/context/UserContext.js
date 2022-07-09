import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

const Context = React.createContext({})

export function UserContextProvider({ children }) {
    const [token, setToken] = useState(() => window.sessionStorage.getItem('token'))
    const [userInfo, setUserInfo] = useState({ id: null, username: '', role: null, alias: '' })

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token);

            setUserInfo({
                id: decoded.id,
                username: decoded.username,
                role: decoded.role,
                alias: decoded.alias
            })
        }
    }, [token])


    return <Context.Provider value={{ token, setToken, userInfo }}>
        {children}
    </Context.Provider>

}

export default Context;