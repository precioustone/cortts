import React, { Component } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { connect } from "react-redux";
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { addUser } from "../redux/actions";
import { validateEmail } from '../db/validator';

import { ButtonThickStr } from '../components/button.js';

import CustomInput from '../components/textInputs.js';
import { getUser } from '../db/database';
import { LOGIN } from '../db/task';


class LoginScreen extends Component{

    static navigationOptions = {
        
    };
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            fontLoaded: false,
            email: '',
            password: '',
            remember: false,
            modalVisible: false,
        };

    }

    async componentDidMount(){
        await Font.loadAsync({ 'gotham-medium': require('../assets/fonts/GothamMedium.ttf') });

        this.setState({ fontLoaded: true });
    }

   handleEmail = (email) => this.setState({email});

   handlePassword = (password) => this.setState({password});

   handleRemember = (remember) => this.setState({remember});

   validate = (email, password, remember) => {
       
        if(validateEmail(email) && password.length >= 8){
            this._signInAsync(email, password, remember);
        }
    } 

   _signInAsync = async (email, password,  remember) => {

        let user = { email, password, remember };
        
        this.setState({modalVisible: true});

        getUser({type: LOGIN},user,this.props.addUser, this.onSuccess, this.onError);
        
    };

    onError = (response) => {
        this.setState({modalVisible: !this.state.modalVisible});
        this.setState({msg: response});
        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: false,
        });
    }

    onSuccess = (response) => {
        this.setState({modalVisible: !this.state.modalVisible});
        this.setState({msg: response});
        showMessage({
            message: this.state.msg,
            type: "success",
            autoHide: false,
        });
        this.props.navigation.navigate('Main');
    }

   renderModal = () => (<Modal animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={ 
            this.handleClick
        }>
        <View 
        style={{flex: 1, alignItems: 'center', 
        justifyContent:'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: 30,}}>
            <View style={{
                padding: 15,
                width: '100%',
                }}>
                <ActivityIndicator />
            </View>
        </View>
    </Modal>);

    render(){

        const { navigate } = this.props.navigation;

        return (
            this.state.fontLoaded ? (
                <KeyboardAvoidingView style={styles.kAV} behavior="padding" enabled={true}>
                    { this.renderModal() }
                    <View style={styles.top}>
                        <Image source={require('../assets/listing.png')} style={{width: 150, height: 150}} />
                        <Text style={{color: '#737373', fontFamily: 'gotham-medium'}}>LOG IN To Cortts Listing</Text>
                    </View>
                    
                    <CustomInput 
                        placeholder= 'Email Address'
                        onChangeText={(text) => this.handleEmail(text)}
                        value={this.state.email}
                        style={styles.text}
                        keyboardType='email-address'
                    />

                    <CustomInput 
                        placeholder= 'Password'
                        onChangeText={(text) => this.handlePassword(text)}
                        secureTextEntry={true}
                        value={this.state.password}
                        style={styles.text}
                    />
                    <View style={styles.toggle}>
                        <Switch 
                            onValueChange={this.handleRemember}
                            value={this.state.remember}
                            style={{flex: 2}}
                        />
                        <Text style={{flex: 8, color: '#737373', fontFamily: 'gotham-medium'}}>Keep me signed in</Text>
                    </View>

                    <ButtonThickStr 
                        onClick={() => this.validate(this.state.email, this.state.password, this.state.remember)}
                        text= 'LOGIN'
                        style={styles.button}
                        containerStyle={{backgroundColor: '#26B469', borderColor: "#FFF"}}
                    />
                    <Text style={{color: '#26B469'} }
                        onPress={() => navigate('Forgot')}>
                        Forgot password ?
                    </Text>
                    <FlashMessage position='top' animated={true} />
                </KeyboardAvoidingView>
           ) : null
        );
    };
};

export default connect(
    null,
    { addUser }
)(LoginScreen);

const styles = StyleSheet.create({
    kAV: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    button: {
        color: '#fff', 
        padding: 10,
        fontFamily: 'gotham-medium'
    },
    text: {
        fontFamily: 'gotham-medium',
        width: '100%',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 15,
        color: '#000000',
    },
});