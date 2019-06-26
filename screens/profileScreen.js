import React, { Component } from 'react';
import { ImageBackground,StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as Font from 'expo-font';
import ActionButton from 'react-native-action-button';


export default class Profile extends Component{

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'gotham-medium': require('../assets/fonts/GothamMedium.ttf'),
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



    render(){
        return (
            <ImageBackground source={require('../assets/profile.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.view}>
                        { this.state.fontLoaded ? (
                        <Text style={styles.text} >{this.state.name}</Text>): null }
                        <Avatar source={this.state.image} rounded
                        size='xlarge'/>
                        { this.state.fontLoaded ? (
                        <Text style={styles.text} >{this.state.email}</Text>): null }
                    </View>

                    <View style={styles.view}>
                    { this.state.fontLoaded ? (
                        <Text style={styles.text} >Phone</Text>): null }
                    { this.state.fontLoaded ? (
                        <Text style={styles.val} >{this.state.phone}</Text>): null }
                    { this.state.fontLoaded ? (
                        <Text style={styles.text} >Password</Text>): null }
                    { this.state.fontLoaded ? (
                        <Text style={styles.val} >{this.state.password}</Text>): null }
                    </View>
                    <ActionButton
                        buttonColor="#26B469"
                        onPress={() => { console.log("hi")}}
                    />
                </View>
            </ImageBackground>
        );
    };
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
    container: {
        flex: 1,
        paddingTop: 100,
    },
    view: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    text: {
        color: '#fff',
        fontFamily: 'gotham-medium',
        marginVertical: 15,
        fontSize: 20,
    },
    val: {
        color: '#fff',
        fontFamily: 'gotham-medium',
        
        fontSize: 20,
    },

});