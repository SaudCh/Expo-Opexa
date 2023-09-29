import React from "react";
import {
    View,
    FlatList,
    Dimensions,
    Animated,
    StyleSheet,
    Image
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Slider(props) {
    const { images } = props;

    const scrollX = new Animated.Value(0);

    const styles = StyleSheet.create({
        dotView: {
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
        },
        cardView: {
            flex: 1,
            width: width - 10,
            height: height / 6,
            backgroundColor: "white",
            marginVertical: 10,
            marginLeft: 0,
            marginEnd: 5
        },
        ImgStyle: {
            width: width - 10,
            height: height / 6,
            resizeMode: 'cover'
        },
    });

    return (
        <View>
            <FlatList
                data={images}
                keyExtractor={(item, index) => "key" + index}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment="center"
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View style={{ ...styles.cardView }}>
                            <Image
                                source={{
                                    uri: item.url
                                }}
                                style={{ ...styles.ImgStyle }}
                            />
                        </View>
                    )
                }}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } },
                ],
                    { useNativeDriver: false })}
            />
        </View>
    );
}