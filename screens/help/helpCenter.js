import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Button, Searchbar, Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import animation from '../../assets/terms.json';
import HCard from '../../components/helpCenter/hCard';
import VCard from '../../components/helpCenter/vCard';
import { Colors } from '../../constants/colors';

function HelpCenterScreen() {
    const question = [0, 1]
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>How can we help you today?</Text>
                <Searchbar
                    placeholder="Search"
                    style={styles.search}
                />

                <Text style={styles.heading}>
                    Top Articles
                </Text>
                <View style={{
                    height: 170
                }}>
                    <FlatList
                        data={question}
                        renderItem={({ item }) => <HCard />}
                        keyExtractor={item => item.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <Text style={styles.heading}>
                    Latest Discussions
                </Text>
                <VCard />
                <VCard />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    animation: {
        width: '80%',
        height: undefined,
        aspectRatio: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: "Circular"
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
    },
    search: {
        marginBottom: 20,
        padding: 0,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    heading: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: "CircularBold",
        color: Colors.primary
    }
});

export default HelpCenterScreen;
