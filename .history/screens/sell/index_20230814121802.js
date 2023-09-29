import { List, Divider } from 'react-native-paper';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';

import React, { useEffect } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SafeAreaContainer from '../../components/safeAreaContainer';
import { Colors } from '../../constants/colors';
// import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../config/firebase';
import useAuth from '../../hooks/useAuth';
import LoginFirst from '../../components/loginFirst';
import axios from 'axios';


const SelectCategory = ({ route }) => {

    const { isLoggedIn } = useAuth()
    const [categories, setCategories] = React.useState([])

    const navigation = useNavigation()

    const handlePress = (item) => {
        navigation.navigate(item.subcategories.length > 0 ? 'SelectSubCategory' : 'AddProduct', {
            title: item.name,
            expert: route?.params?.expert ? true : false,
            category: {
                id: item.id,
                name: item.name,
                image: item.image
            },
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
                    console.log(res.data.categories)
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))

        }

        getData()

        // setLoading(false)
    }, [])

    useEffect(() => {

        if (!isLoggedIn) return

        Alert.alert(
            "Charges",
            "An amount of Rs. 200 will be deducted from your wallet for each product you list.",
            [
                {
                    text: "Cancel",
                    onPress: () => navigation.goBack(),
                    style: "cancel"
                },

                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }, [])

    if (!isLoggedIn) {
        return (
            <LoginFirst text="You need to login first to sell your product" />
        )
    }

    return (
        <SafeAreaContainer
            styleProp={{
                paddingHorizontal: 10,
            }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Text style={styles.title}>
                    Sell
                </Text>
            </View>

            <Text style={styles.subTitle}>
                Select a category
            </Text>
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
