import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function Rating({
    rating,
    setRating
}) {
    return (
        <View style={styles.ratingCOntainer}>
            <TouchableOpacity onPress={() => setRating(1)}>
                <Image
                    source={
                        rating == 1 ?
                            require('../assets/rating/R1.png')
                            :
                            require('../assets/rating/RB1.png')
                    }
                    style={{ width: 40, height: 40 }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRating(2)}>
                <Image
                    source={
                        rating == 2 ?
                            require('../assets/rating/R2.png')
                            :
                            require('../assets/rating/RB2.png')
                    }
                    style={{ width: 40, height: 40 }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRating(3)}>
                <Image
                    source={
                        rating == 3 ?
                            require('../assets/rating/R3.png')
                            :
                            require('../assets/rating/RB3.png')
                    }
                    style={{ width: 40, height: 40 }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRating(4)}>
                <Image
                    source={
                        rating == 4 ?
                            require('../assets/rating/R4.png')
                            :
                            require('../assets/rating/RB4.png')
                    }
                    style={{ width: 40, height: 40 }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRating(5)}>
                <Image
                    source={
                        rating == 5 ?
                            require('../assets/rating/R5.png')
                            :
                            require('../assets/rating/RB5.png')
                    }
                    style={{ width: 40, height: 40 }}
                />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    ratingCOntainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 16,
    },
})