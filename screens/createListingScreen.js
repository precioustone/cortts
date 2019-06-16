import React, { Component } from 'react';
import { Image,StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Font from 'expo-font';

import Header from '../components/customHeader';
import CustomPicker from '../components/picker';
import { CustomInputWithLabel } from '../components/textInputs';


export default class CreateListing extends Component{

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf'),
          });
      
        this.setState({ fontLoaded: true });
    }

    state = {
        fontLoaded: false,
        name: "Anita Egwin",
        email: "Anita@cortts.com",
        password: "***********",
        phone: '+23480 000 0001',
        image: require('../assets/icon2.png'),
    };

    initialFunction = () => {
        const { navigate } = this.props.navigation;
        navigate('Profile');
    };

    render(){

        const { navigate } = this.props.navigation;

        return (
            this.state.fontLoaded ? (
            <View style={{ flex: 1 }}>
            
                <Header
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={'ADD NEW PROPERTY'}
                    initials='AE'
                    style={{fontFamily: 'raleway-bold'}}
                />
                <ScrollView>
                    <CustomInputWithLabel
                        label='Property Description/Units:y'
                        labelStyle={{fontFamily: 'raleway-bold'}}
                    />
                </ScrollView>
            </View>) : null
        );
    };
}

const styles = StyleSheet.create({
    
});