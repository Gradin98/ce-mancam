import React, { Component } from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './components/AppStyle';
import { AuthContext } from './providers/AuthProivder';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import AuthService from './services/AuthService';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutScreen from './components/LogoutScreen';

const Tab = createMaterialBottomTabNavigator();

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#000',
        accent: '#000',
    },
};

interface AppProps {

}

interface AppState {
    isLogged: boolean,
    loading: boolean
}


class App extends Component<AppProps, AppState> {


    _isInLogin: boolean = false;

    constructor(props: AppProps) {
        super(props);

        this.state = {
            isLogged: false,
            loading: false,
        };
    }

    async componentDidMount() {
        await this.checkLogin();

        this.setState({
            loading: true
        });
    }

    async checkLogin() {
        const authService = new AuthService();

        const resp = await authService.checkAuth();

        if (!resp) {
            this.setState({
                isLogged: false
            })
        }
        else {
            this.setState({
                isLogged: true
            });
        }
    }

    loginView = () => {
        return (

            <>
                <Tab.Screen options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="login" color={color} size={26} />
                    )
                }} name="Log In" component={LoginScreen} />

                <Tab.Screen options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-plus" color={color} size={26} />
                    ),
                }} name="Register" children={() => <RegisterScreen showRegister={true} />} />
            </>

        )
    }

    appView = () => {
        return (
            <>
                <Tab.Screen options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }} name="Spin" component={HomeScreen} />
                <Tab.Screen options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="food" color={color} size={26} />
                    )
                }} name="Setup" component={SettingsScreen} />
                <Tab.Screen options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="logout" color={color} size={26} />
                    ),

                }} name="Log out" component={LogoutScreen} />
            </>
        )
    }

    handleProviderUpdate = () => {
        this.setState({
            isLogged: true
        });
    }

    render() {
        return (
            <AuthContext.Provider value={{ isAuthenticate: this.state.isLogged, update: this.handleProviderUpdate }}>
                <PaperProvider theme={theme}>
                    <NavigationContainer onStateChange={(state) => this.checkLogin()}>
                        <Tab.Navigator barStyle={styles.background} activeColor={'#000'}>
                            {this.state.isLogged ? this.appView() : this.loginView()}
                        </Tab.Navigator>
                    </NavigationContainer>
                </PaperProvider>
            </AuthContext.Provider>
        )
    }
}

export default App;