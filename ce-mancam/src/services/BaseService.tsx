import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from "react-native-dotenv";
import ENV from "../Configuration";

export default class BaseService {

    protected axiosInstance = async () => {
        return axios.create({
            baseURL: __DEV__ ? ENV.development.api_url : ENV.production.api_url,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${await AsyncStorage.getItem('token')}`
            }
        });
    }

}