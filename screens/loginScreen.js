import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Image, KeyboardAvoidingView, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import * as Font from 'expo-font';

import { ButtonThickStr } from '../components/button.js';

import CustomInput from '../components/textInputs.js';
import { ScrollView } from 'react-native-gesture-handler';

export default class LoginScreen extends Component{

    static navigationOptions = {
        
    };
    constructor(props) {
        super(props);
        this.state = {
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


   _signInAsync = async () => {
        this.setState({modalVisible: !this.state.modalVisible})
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    };

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
            <ScrollView>
                <KeyboardAvoidingView style={styles.kAV} behavior="padding" enabled>
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
                        onClick={() => this._signInAsync()}
                        text= 'LOGIN'
                        style={styles.button}
                        containerStyle={{backgroundColor: '#26B469', borderColor: "#FFF"}}
                    />
                    <Text style={{color: '#26B469'} }
                        onPress={() => navigate('Forgot')}>
                        Forgot password ?
                    </Text>
                </KeyboardAvoidingView>
            </ScrollView>) : null
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