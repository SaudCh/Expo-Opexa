import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export default function useWishlist() {
    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
    } = useContext(AuthContext)

    const isWishlisted = (product) => {
        return wishlist.includes(product)
    }

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
    }
}
