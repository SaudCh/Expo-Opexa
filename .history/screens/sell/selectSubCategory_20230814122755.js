import { List, Divider } from 'react-native-paper';
import axios from 'axios';

import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text } from 'react-native';

import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';


const CategoryList = ({ route }) => {

    const { category, expert } = route.params

    const [categories, setCategories] = React.useState([])


    const navigation = useNavigation()

    const handlePress = (item) => {
        navigation.navigate(item.subcategories.length > 0 ? 'SelectFurCategory' : 'AddProduct', {
            title: item.name,
            category: category,
            expert: expert,
            subcategory: {
                id: item.id,
                name: item.name,
            },
            furthercategory: ""
        })
    };

    const renderCategoryItem = ({ item }) => (
        <>
            {/* display chevron right only if item subcategory length is grater than 1 */}
            <List.Item
                title={item.name}
                onPress={() => handlePress(item)}
                right={(props) => item.subcategories.length > 0 ? <List.Icon {...props} icon="chevron-right" /> : null}
                style={{
                    paddingVertical: 15
                }}
            />
            <Divider />

        </>
    );

    useEffect(() => {
        // setLoading(true)
        const getData = async () => {
            await axios.get('category')
                .then(res => {
                    setCategories(res.data.categories)
                })
                .catch(err => console.log(err))
            // .finally(() => setLoading(false))

        }

        getData()
    }, [])
    return (

        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 10
            }}

        />
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
        color: Colors.primary,
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 10,
        color: Colors.grey,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
        borderRadius: 50,
        marginLeft: 10
    },
});

export default CategoryList;
