import React, { useState } from 'react';

const Context = React.createContext({})

export function UserContextProvider({ children }) {
    const [token, setToken] = useState(() => window.sessionStorage.getItem('token'))

    return <Context.Provider value={{ token, setToken }}>
        {children}
    </Context.Provider>

}

export default Context;