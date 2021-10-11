import React, { useState } from 'react'

const AuthContext = React.createContext({
    user: null,
    login: () => { },
    logout: () => { }
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState()

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext