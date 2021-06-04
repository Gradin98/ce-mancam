import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Modal } from 'react-native-paper'
import AuthService from '../services/AuthService';
import { NavigationContext } from '@react-navigation/native';
import styles from './AppStyle'
import { AuthContext } from '../providers/AuthProivder';

interface LoginProps {
    isLogged: any
}

export interface LoginState {
    email: string,
    password: string
}

export default class LoginScreen extends Component<LoginProps, LoginState> {

    static contextType = AuthContext;

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    manageLogin = async (context: {isAuthenticate: boolean, update: any}) => {
        const authService = new AuthService();
        try{
            let response = await authService.login(this.state);
            
            if(response.status == 200) {
    
                AsyncStorage.clear();
                AsyncStorage.setItem("token", `${response.data.token}`);
                AsyncStorage.setItem("id", `${response.data.user.id}`);
                AsyncStorage.setItem("email", `${response.data.user.email}`);
    
                context.isAuthenticate = true;
                context.update();
            }
        } catch (error) {
            console.log({error});
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogin}>
                    <TextInput
                        label="Email"
                        style={styles.loginInput}
                        underlineColor="transparent"
                        selectionColor={"#000"}
                        outlineColor={"#000"}
                        underlineColorAndroid="transparent"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />

                    <TextInput
                        label="Password"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        underlineColor="transparent"
                        selectionColor={"#000"}
                        outlineColor={"#000"}
                        underlineColorAndroid="transparent"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                    /> 

                    <AuthContext.Consumer>
                        {context => (
                            <Button icon="food" dark={true} compact={true} color={"#000"}
                                onPress={() => {this.manageLogin(context);}}>
                                Log In
                            </Button>
                        )}
                    </AuthContext.Consumer>

                    

            </SafeAreaView>


        )
    }
}
