import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { StyleSheet, Text, View, FlatList, ListRenderItemInfo, Alert } from 'react-native';
import { IconButton, Button, Modal, TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FoodService from '../services/FoodService';
import styles from './AppStyle';


interface DataType { id: string, title: string }
interface ItemProps extends DataType { handleData: any, handleEdit: any}
interface SettingsProps { }
interface SettingsState { showModal: boolean, modalInputValue: string, isInEdit: boolean, idEdit: number }

let DATA: DataType[] = [
];

export class Item extends Component<ItemProps> {

    _foddService = new FoodService();

    constructor(props: ItemProps) {
        super(props);
    }

    deleteItemFromlist = async (id: string) => {

        const response = await this._foddService.deleteFood(parseInt(id));

        if(response.status == 200){
            for(let i = DATA.length - 1; i >= 0; i--){
                if(DATA[i].id === id){
                    DATA.splice(i,1);
                    this.props.handleData(true)
                    break;
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={styles.buttonList}>
                    <IconButton icon="database-edit" 
                        onPress={() => this.props.handleEdit(this.props.id, this.props.title)} />
                    <IconButton icon="delete" onPress={() => this.deleteItemFromlist(this.props.id)} />
                </View>
            </View>
        )
    }
}


export default class SettingsScreen extends Component<SettingsProps, SettingsState> {

    _foddService = new FoodService();
    
    constructor(props: SettingsProps){
        super(props);

        this.state = {
            showModal: false,
            modalInputValue: "",
            isInEdit: false,
            idEdit: 0,
        }
    }

    async componentDidMount() {
        try{
            const response = await this._foddService.getFoodForUser();

            DATA = [];
            for(let i = 0; i < response?.data.length; i++){
                DATA.push({
                    id: `${response?.data[i].id}`,
                    title: response?.data[i].title
                })
            }

            this.setState({
                modalInputValue: ""
            });
        } catch(error){
            console.log(error);
        }

    }

    manageModalVisibility = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    manageAddElement = async () => {

        const response = await this._foddService.addFoodForUser(this.state.modalInputValue);

        if(response.status === 200){
            DATA.push({
                id: `${response.data.id}`,
                title: this.state.modalInputValue
            });
    
            this.setState({
                modalInputValue: "",
                showModal: !this.state.showModal
            });
        }

    }

    manageEditElement = async () => {
        const response = await this._foddService.editElement(this.state.idEdit, this.state.modalInputValue);

        if(response.status === 200) {
            for(let i = 0; i < DATA.length; i++) {
                if(DATA[i].id === `${this.state.idEdit}`){
                    DATA[i].title = this.state.modalInputValue;

                    this.setState({
                        idEdit: 0,
                        isInEdit: false,
                        modalInputValue: "",
                        showModal: false,
                    })
                }
            }
        }
    }

    handleDataChanged = (value: boolean) => {
        if(value){
            this.setState({
                modalInputValue: ""
            });
        }
    }

    handleEdit = (id: number, title: string) => {
        this.setState({
            modalInputValue: title,
            showModal: !this.state.showModal,
            isInEdit: true,
            idEdit: id
        });
    }

    renderItem = (item: ListRenderItemInfo<DataType>) => (
        <Item handleEdit={this.handleEdit} 
            handleData={this.handleDataChanged} 
            id={item.item.id} 
            title={item.item.title} />
    );

    setModalText = (text: string) => {
        this.setState({
            modalInputValue: text
        });
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>


                <FlatList
                    data={DATA}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />

                <Button icon="food" dark={true} compact={true} color={"#000"} 
                    onPress={this.manageModalVisibility}>
                    Add new element
                </Button>
                <Modal visible={this.state.showModal} onDismiss={this.manageModalVisibility} 
                    contentContainerStyle={styles.containerStyle}>
                    <TextInput
                    label="New Food"
                    underlineColor="transparent"
                    selectionColor={"#000"}
                    outlineColor={"#000"}
                    underlineColorAndroid="transparent"
                    value={this.state.modalInputValue}
                    onChangeText={text => this.setModalText(text)}
                    />
                    <Button icon="food" dark={true} compact={true} color={"#000"} 
                    onPress={this.state.isInEdit ? this.manageEditElement : this.manageAddElement}>
                    {this.state.isInEdit ? "Edit element" : "Add new element"}
                </Button>
                </Modal>
            </SafeAreaView>
        )
    }
}
