import { List, Divider } from 'react-native-paper';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SafeAreaContainer from '../../components/safeAreaContainer';
import { Colors } from '../../constants/colors';
// import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../config/firebase';


const SelectCategory = ({ route }) => {

    const [categories, setCategories] = React.useState([])

    const navigation = useNavigation()

    const handlePress = (item) => {
        navigation.navigate(item.subcategories.length > 0 ? 'SelectSubCategory' : 'AddProduct', {
            title: item.name,
            expert: route?.params?.expert ? true : false,
            category: item._id,
            subcategory: "",
            furthercategory: ""

        })
    };

    const renderCategoryItem = ({ item }) => (
        <>
            {/* display chevron right only if item subcategory length is grater than 1 */}
            <List.Item
                title={item.name}
                left={() => <Image source={{ uri: item.image }} style={styles.logo} />}
                onPress={() => handlePress(item)}
                right={(props) => item.subcategories.length > 0 ? <List.Icon {...props} icon="chevron-right" /> : null}
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
        <SafeAreaContainer
            styleProp={{
                paddingHorizontal: 10,
            }}
        >
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaContainer>
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

export default SelectCategory;
