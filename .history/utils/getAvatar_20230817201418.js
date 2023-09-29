export const getAvatar = (image) => {
    return image ? { uri: `${process.env.EXPO_PUBLIC_API_URL}${image}` } : require("../assets/avatar.png");
}
