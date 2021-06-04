import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseService from "./BaseService";

export default class FoodService extends BaseService {

    public getFoodForUser = async () => {
        try{
            const id = await AsyncStorage.getItem('id');
        
            const response = await (await this.axiosInstance()).get(`/food/get/user/${id}`);
            return response;
        } catch (error){
            console.log(error)
        }
    }

    public getRandomFood = async () => {
        try{
            const id = await AsyncStorage.getItem('id');
        
            const response = await (await this.axiosInstance()).get(`/food/get/random/${id}`);
            return response;
        } catch (error){
            console.log(error)
        }
    }

    public addFoodForUser = async (title: string) => {
        const id = await AsyncStorage.getItem('id');
        const value = {
            UserId: parseInt(id || ""),
            Title: title
        };

        const response = await (await this.axiosInstance()).post(`/food/add`, JSON.stringify(value));
        return response;
    }

    public deleteFood = async (id: number) => {
        const response = await (await this.axiosInstance()).delete(`/food/delete/${id}`);
        return response;
    }

    public editElement = async (id: number, title: string) => {
        const response = await (await this.axiosInstance()).put(`/food/edit/${id}/${title}`);
        return response;
    }

}