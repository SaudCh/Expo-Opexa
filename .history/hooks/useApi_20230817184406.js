import axios from "axios";

const useApi = () => {

    const uploadImage = async (name, file, setLoading) => {
        const formData = new FormData();

        const ext = file.uri.split('.').pop();
        const filename = `${randomString(20)}.${ext}`;
        const newFile = {
            uri: file.uri,
            name: filename.trim(),
            type: `image/${ext}`,
        };

        formData.append(name, newFile);

        try {

            const response = await axios.post('/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);

            return {
                status: 200,
                message: response.data.message,
                image: response.data.imageUrl
            }

        } catch (error) {
            if (setLoading) setLoading(false)
            return {
                status: 400,
                message: error?.response?.data?.message || error.message
            }
        }

    }

    const uploadImages = async (name, files, setLoading) => {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {

            const ext = files[i].uri.split('.').pop();
            const filename = `${randomString(20)}.${ext}`;
            const file = {
                uri: files[i].uri,
                name: filename.trim(),
                type: `image/${ext}`,
            };

            formData.append(name, file);
        }

        try {
            const response = await axios.post('/upload-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return {
                status: 200,
                message: response.data.message,
                images: response.data.imageUrls
            }

        } catch (error) {
            return {
                status: 400,
                message: error?.response?.data?.message || error.message
            }
        }
    }

    const updateImages = async (files) => {

        let images = [];
        for (let i = 0; i < files.length; i++) {

            if (typeof files[i] == 'string') {
                images.push(files[i]);
            } else {
                const response = await uploadImage('image', files[i]);
                if (response.status === 200) {
                    images.push(response.image);
                }
            }


        }

        return {
            status: 200,
            images
        };
    }

    const randomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }


    return { uploadImage, uploadImages, updateImages }
}

export default useApi;