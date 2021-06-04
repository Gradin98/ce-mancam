import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Button, TextInput, Modal } from 'react-native-paper'
import AuthService from '../services/AuthService';
import styles from './AppStyle'
import { NavigationContext } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

interface RegisterProps {
    showRegister: boolean
}

export interface RegisterState {
    email: string,
    password: string
}

export default class RegisterScreen extends Component<RegisterProps, RegisterState> {

    static contextType = NavigationContext;

    constructor(props: RegisterProps) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    manageRegister = async () => {
        let authService = new AuthService();

        let response = await authService.register(this.state);

        if (response.status == 201) {
            const navigation = this.context;
            navigation.goBack();
        }
    }

    render() {
        return (
            <>
                {this.props.showRegister ?
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
                            secureTextEntry={true}
                            style={styles.loginInput}
                            underlineColor="transparent"
                            selectionColor={"#000"}
                            outlineColor={"#000"}
                            underlineColorAndroid="transparent"
                            value={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />

                        <Button icon="food" dark={true} compact={true} color={"#000"}
                            onPress={this.manageRegister}>
                            Register
                </Button>

                    </SafeAreaView>
                    :
                    <SafeAreaView style={styles.containerCenter}>
                        <Text>Loading</Text>
                        </SafeAreaView>
                }
            </>
        )
    }
}
