import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { getImageUrl } from '../utils/getImageUrl';

const CategoryList = ({
    categories = []
}) => {

    const renderCategoryItem = ({ item }) => {
        return (
            <View style={styles.categoryItem}>
                <Image source={{
                    uri: getImageUrl(item.image)
                }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{item.name.substr(0, 20)}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 0,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 20,
    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 100,
    },
    categoryName: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
});

export default CategoryList
