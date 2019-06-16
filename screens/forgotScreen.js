import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import * as Font from 'expo-font';

import { ButtonThickStr } from '../components/button.js';

import CustomInput from '../components/textInputs.js';

export default class ForgotPassword extends Component{

    static navigationOptions = {
        header: null,
    };

    state = {
        fontLoaded: false,
        email: '',
    }

    async componentDidMount(){
        await Font.loadAsync({ 'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf') });
        this.setState({ fontLoaded: true });
    }

   handleEmail = (email) => this.setState({email});

   handleClick = () => {
        const { navigate } = this.props.navigation;
        navigate('Home');
   };

    render(){

        const { navigate } = this.props.navigation;

        return (
            this.state.fontLoaded ? (
            <KeyboardAvoidingView style={styles.kAV}  enabled>
                <View style={styles.top}>
                    <Text style={{color: '#02B598', fontSize: 30, fontFamily: 'raleway-bold'}}>
                        Forgot Passwod? 
                    </Text>
                    <Text style={{color: '#737373', fontFamily: 'raleway-bold'}}>Enter your Email address</Text>
                </View>
                
                <CustomInput 
                    placeholder= 'Email Address'
                    onChangeText={(text) => this.handleEmail(text)}
                    value={this.state.email}
                    style={{width: '100%', fontFamily: 'raleway-bold'}}
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
        fontFamily: 'raleway-bold',
    }
});