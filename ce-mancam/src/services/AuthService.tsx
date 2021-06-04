
import BaseService from './BaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginState } from '../components/LoginScreen';
import { RegisterState } from '../components/RegisterScreen';

export default class AuthService extends BaseService {
    
    public login = async (value: LoginState) => {
        try{
            const response = await (await this.axiosInstance()).post("/user/login",JSON.stringify(value));

            return response;
        } catch(error: any){
            return error.response;
        }
    }

    public register = async (value: RegisterState) => {
        try{
            const response = await (await this.axiosInstance()).post("/user/register",JSON.stringify(value));

            return response;
        } catch(error: any){
            return error.response;
        }
    }

    public checkAuth = async () => {
        if(!await AsyncStorage.getItem('token')) return false;

        try {
            const response = await (await this.axiosInstance()).get("/user/check");

            return true;
        } catch(error: any){
            console.log(error);
            return false;
        }
    }


}