import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export default function useAuth() {
    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
    } = useContext(AuthContext)

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
    }
}
