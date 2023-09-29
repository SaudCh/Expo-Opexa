import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

async function getToken() {

    const token = await AsyncStorage.getItem("@token");
    if (token) return token;

    return "";
}

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL + "api";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
    },
    (error) => {
        Alert.alert(error?.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        Alert.alert(error?.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export default axios;