import { List, Divider } from 'react-native-paper';
import axios from 'axios';

import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import Modal from './modal';


const FurCategoryModal = ({ route, category, subcategory, visible, onDismiss }) => {

    const [categories, setCategories] = React.useState([])


    const navigation = useNavigation()

    const handlePress = (item) => {
        // navigation.navigate('AddProduct', {
        //     title: item.name,
        //     expert: expert,
        //     category: category,
        //     subcategory: subcategory,
        //     furthercategory: {
        //         id: item._id,
        //         name: item.name
        //     }
        // })

    };

    const renderCategoryItem = ({ item }) => (
        <>
            <List.Item
                title={item.name}
                onPress={() => handlePress(item)}
                style={{
                    paddingVertical: 15
                }}
            />
            <Divider />
        </>
    );

    useEffect(() => {

        const getData = async () => {
            await axios.get('furthercategory?subcategory=' + subcategory.id)
                .then(res => {
                    setCategories(res.data.furthercategories)
                })
                .catch(err => console.log(err))
            // .finally(() => setLoading(false))

        }

        getData()

    }, [])
    return (
        <Modal
            visible={visible}
            onDismiss={() => onDismiss()}
            title={'Subcategory'}
            back={true}
            backPress={backPress}
        >
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 10
                }}
            />
        </Modal>
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

export default FurCategoryModal;
