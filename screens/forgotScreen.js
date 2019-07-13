import React, { Component } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';

import { ButtonThickStr } from '../components/button.js';

import CustomInput from '../components/textInputs.js';
import { forgotPassword } from '../db/database';

class ForgotPassword extends Component{

    static navigationOptions = {
        header: null,
    };

    state = {
        fontLoaded: false,
        email: '',
        msg: null,
        modalVisible: false,
    }

    async componentDidMount(){
        await Font.loadAsync({ 'gotham-medium': require('../assets/fonts/GothamMedium.ttf') });
        this.setState({ fontLoaded: true });
    }

   handleEmail = (email) => this.setState({email});

   handleClick = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
        let formData = new FormData();
        formData.append('email',this.state.email);
        forgotPassword( formData, this.onSuccess, this.onError );
   }

    onError = (response) => {
        this.setState({ modalVisible: !this.state.modalVisible, msg: response });

        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: false,
        });
    }

    onSuccess = (response) => {
        this.setState({ modalVisible: !this.state.modalVisible, msg: response });
        showMessage({
            message: this.state.msg,
            type: "success",
            autoHide: false,
        });
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

        return (
            this.state.fontLoaded ? (
            <KeyboardAvoidingView style={styles.kAV}  enabled>
                {this.renderModal()}
                <View style={styles.top}>
                    <Text style={{color: '#02B598', fontSize: 30, fontFamily: 'gotham-medium'}}>
                        Forgot Passwod? 
                    </Text>
                    <Text style={{color: '#737373', fontFamily: 'gotham-medium'}}>Enter your Email address</Text>
                </View>
                
                <CustomInput 
                    placeholder= 'Email Address'
                    onChangeText={(text) => this.handleEmail(text)}
                    value={this.state.email}
                    style={styles.text}
                />

                <View style={styles.toggle}>
                    <ButtonThickStr 
                        onClick={() => this.handleClick()}
                        text= 'RESET PASSWORD'
                        style={styles.button}
                        containerStyle={{backgroundColor: '#26B469', borderColor: '#26B469'}}
                    />
                    <Text style={{color: '#26B469'} }
                        onPress={() => this.props.navigation.goBack()}>
                        Go Back 
                    </Text>
                </View>
            </KeyboardAvoidingView>) : null
        );
    };
};

export default connect(null,null)(ForgotPassword);

const styles = StyleSheet.create({
    kAV: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: '30%',
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    toggle: {
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
        fontSize: 18,
        color: '#000000',
    },
});