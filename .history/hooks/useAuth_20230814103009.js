import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export default function useAuth() {
    const {
        Login,
        Logout,
        getProfile,
        getLoggedIn,
        token,
        user,
        profile,
        socket,
        isLoggedIn,
        autoLogin
    } = useContext(AuthContext)

    return {
        isLoggedIn,
        Login,
        Logout,
        getProfile,
        getLoggedIn,
        token,
        user,
        profile,
        socket,
        autoLogin
    }
}
