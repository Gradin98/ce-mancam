import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import styles from './AppStyle'

export default class LogoutScreen extends Component {
    
    componentDidMount() {
        AsyncStorage.clear();
    }

    render() {
        return (
            <View style={styles.containerCenter}>
                <Text>            
                    Logout
                </Text>
            </View>
        )
    }
}
