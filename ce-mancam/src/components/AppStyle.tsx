import { StyleSheet, Text, View, FlatList, ListRenderItemInfo, StatusBar } from 'react-native';
import Constants from 'expo-constants'

const colors = {
    background: "#f7f7f7",
    surface: "#f7f7f7",
    primary: "",
    secondary: "",
    text: "#a7a7a7"
}

const styles = StyleSheet.create({
    normalView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: StatusBar.currentHeight,
        backgroundColor: colors.background
    },
    textStyle: {
        fontSize: 20,
        paddingBottom: 20
    },
    background: {
        backgroundColor: colors.background
    },
    container: {
        flex: 1,
        marginTop: (StatusBar.currentHeight),
    },
    containerLogin: {
        flex: 1,
        justifyContent: 'center',
    },

    containerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginInput: {
        margin: 10
    },
    scrollView: {
        backgroundColor: colors.background,
    },
    item: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    buttonList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 20,
        color: colors.text
    },
    containerStyle: {
        backgroundColor: "#fff",
        padding: 20
    }
});

export default styles;