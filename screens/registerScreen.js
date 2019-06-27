import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Image, KeyboardAvoidingView, Modal, StyleSheet, Switch, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { connect } from "react-redux";
import { addUser } from "../redux/actions";

import { ButtonThickStr } from '../components/button';

import CustomInput from '../components/textInputs.js';

class RegisterScreen extends Component{

    static navigationOptions = {
        
    };

    state = {
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

   _signUpAsync = async () => {
        this.setState({modalVisible: !this.state.modalVisible})
        await AsyncStorage.setItem('userToken', {name: 'Anita Egwin', email: this.state.email, phone: '+23480 000 0001'});
        this.props.addUser({name: 'Anita Egwin', email: this.state.email, phone: '+23480 000 0001'})
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
            <KeyboardAvoidingView style={styles.kAV} enabled>
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
                />

                <CustomInput 
                    placeholder= 'Phone Number'
                    onChangeText={(text) => this.handlePhone(text)}
                    value={this.state.phone}
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
                    onClick={() => this._signUpAsync()}
                    text= 'CREATE ACCOUNT'
                    style={styles.button}
                    containerStyle={{ backgroundColor: '#26B469', borderColor: "#FFF"}}
                />
                <Text style={{color: '#26B469'} }
                    onPress={() => navigate('Forgot')}>
                    Terms of Use and Privacy ?
                </Text>
            </KeyboardAvoidingView>) : null
        );
    };
};

export default connect(
    null,
    { addUser }
)(RegisterScreen);

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
        fontFamily: 'gotham-medium',
    },
    text: {
        fontFamily: 'gotham-medium',
        width: '100%',
    },
});