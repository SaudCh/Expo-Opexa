export const getImageUrl = (image) => {
    return `${process.env.REACT_APP_API_URL}/images/${image}`;
}
