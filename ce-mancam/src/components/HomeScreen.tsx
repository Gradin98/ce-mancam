import React, { Component } from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native';
import Constants from 'expo-constants'
import styles from './AppStyle';
import { Button } from 'react-native-paper';
import FoodService from '../services/FoodService';

interface HomeProps { }
interface HomeState { selectedItem: string}



export default class HomeScreen extends Component<HomeProps, HomeState> {

    _foddService = new FoodService();

    constructor(props: HomeProps) {
        super(props);

        this.state = {
            selectedItem: "",
        }
    }

    manageRandomFood = async () => {
        try {
            const response = await this._foddService.getRandomFood();

            this.setState({
                selectedItem: response?.data.title
            });

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.containerCenter}>
                <Text style={styles.textStyle}>{this.state.selectedItem}</Text>

                <Button icon="food" dark={true} compact={true} color={"#000"}
                    onPress={this.manageRandomFood}>
                    Pick food
                </Button>

            </View>
        )
    }
}