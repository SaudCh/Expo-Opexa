export const getImageUrl = (image) => {
    return `${process.env.EXPO_PUBLIC_API_URL}${image}`;
}
