import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import * as Font from 'expo-font';

import { ButtonThickStr } from '../components/button.js';

import CustomInput from '../components/textInputs.js';

export default class LoginScreen extends Component{

    static navigationOptions = {
        
    };

    state = {
        fontLoaded: false,
        email: '',
        password: '',
        remember: false
    }

    async componentDidMount(){
        await Font.loadAsync({ 'gotham-medium': require('../assets/fonts/GothamMedium.ttf') });

        this.setState({ fontLoaded: true });
    }

   handleEmail = (email) => this.setState({email});

   handlePassword = (password) => this.setState({password});

   handleRemember = (remember) => this.setState({remember});

   handleClick = () => {
        const { navigate } = this.props.navigation;
        navigate('Home');
   };

    render(){

        const { navigate } = this.props.navigation;

        return (
            this.state.fontLoaded ? (
            <KeyboardAvoidingView style={styles.kAV} behavior="padding" enabled>
                <View style={styles.top}>
                    <Image source={require('../assets/listing.png')} style={{width: 150, height: 150}} />
                    <Text style={{color: '#737373', fontFamily: 'gotham-medium'}}>LOG IN To Cortts Listing</Text>
                </View>
                
                <CustomInput 
                    placeholder= 'Email Address'
                    onChangeText={(text) => this.handleEmail(text)}
                    value={this.state.email}
                    style={styles.text}
                />

                <CustomInput 
                    placeholder= 'Password'
                    onChangeText={(text) => this.handlePassword(text)}
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
                    onClick={() => this.handleClick()}
                    text= 'LOGIN'
                    style={styles.button}
                    containerStyle={{backgroundColor: '#26B469', borderColor: "#FFF"}}
                />
                <Text style={{color: '#26B469'} }
                    onPress={() => navigate('Forgot')}>
                    Forgot password ?
                </Text>
            </KeyboardAvoidingView>) : null
        );
    };
};

const styles = StyleSheet.create({
    kAV: {
        flex: 1,
        paddingHorizontal: 15,
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
    },
});