import React, { Component } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { connect } from "react-redux";
import { showMessage } from 'react-native-flash-message';
import { register } from "../redux/auth/actions";

import { ButtonThickStr } from '../components/button';

import CustomInput from '../components/textInputs.js';
import { validateEmail, validatePhone } from '../db/validator';


class RegisterScreen extends Component{

    static navigationOptions = {
        
    };

    state = {
        msg: '',
        fontLoaded: false,
        email: '',
        password: '',
        phone: '',
        name: '',
        remember: false,
        modalVisible: false,
    }


    async componentDidMount(){
        await Font.loadAsync({ 'gotham-medium': require('../assets/fonts/GothamMedium.ttf') });
        this.setState({ fontLoaded: true });
    }

   handleEmail = (email) => this.setState({email});

   handlePassword = (password) => this.setState({password});

   handleName = (name) => this.setState({name});

   handlePhone = (phone) => this.setState({phone});

   handleRemember = (remember) => this.setState({remember});

    validate = (email, password, phone, name, remember) => {

        if(validateEmail(email) && validatePhone(phone) && name.length > 0 && password.length >= 8){
            this._signUpAsync(email, password, name, phone, remember);
        }
    } 


   _signUpAsync = async (email, password, name, phone, remember) => {

        let user = { email, password, phone, name, remember };
        
        this.setState({modalVisible: true});

        this.props.register(user, this.onSuccess, this.onError);
        
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
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
        return (
            this.state.fontLoaded ? (
            <ScrollView>
                <KeyboardAvoidingView style={styles.kAV} enabled={true} behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    {this.renderModal()}
                    <View style={styles.top}>
                        <Image source={require('../assets/listing.png')} style={{width: 150, height: 150}} />
                        <Text style={{color: '#737373', fontFamily: 'gotham-medium'}}>LOG IN To Cortts Listing</Text>
                    </View>
                    
                    <CustomInput 
                        placeholder= 'Full Name'
                        onChangeText={(text) => this.handleName(text)}
                        value={this.state.name}
                        style={styles.text}
                    />


                    <CustomInput 
                        placeholder= 'Email Address'
                        onChangeText={(text) => this.handleEmail(text)}
                        value={this.state.email}
                        style={styles.text}
                        keyboardType='email-address'
                    />

                    <CustomInput 
                        placeholder= 'Phone Number'
                        onChangeText={(text) => this.handlePhone(text)}
                        value={this.state.phone}
                        style={styles.text}
                        keyboardType='phone-pad'
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
                        onClick={() => this.validate(this.state.email, this.state.password, this.state.phone, this.state.name, this.state.remember)}
                        text= 'CREATE ACCOUNT'
                        style={styles.button}
                        containerStyle={{ backgroundColor: '#26B469', borderColor: "#FFF"}}
                    />
                    <Text style={{color: '#26B469'} }
                        onPress={() => navigate('Forgot')}>
                        Terms of Use and Privacy ?
                    </Text>
                </KeyboardAvoidingView>
            </ScrollView>) : null
        );
    };
};

export default connect(
    null,
    { register }
)(RegisterScreen);

const styles = StyleSheet.create({
    kAV: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center',
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
        fontFamily: 'gotham-medium',
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