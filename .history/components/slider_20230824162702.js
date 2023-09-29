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