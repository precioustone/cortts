import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const Header = (props) => {
    return (
        <ImageBackground source={require('../assets/header.png')} style={{width: '100%', height: 85, elevation: 5, shadowColor: "#000000"}}>
            <View style={styles.view}>
                <Icon 
                    name='ios-arrow-round-back'
                    type='ionicon'
                    onPress={props.goBack}
                    containerStyle={styles.icon}
                    color='#fff'
                    size={36}
                />
                <Text style={{...props.style,...styles.text}}>{ props.title }</Text>
                {props.show ? (<Ionicons               
                    size={36}
                    onPress={props.onPress}
                    name='md-share'
                    style={{color: '#fff', margin: 20}}
                />) : null}
            </View>
        </ImageBackground>
    );
};

export const WhiteHeader = (props) => {
    return (
        <View style={{ backgroundColor: "#ffffff", width: '100%', height: 85, elevation: 5, shadowColor: "#000000"}}>
            <View style={styles.view}>
                <Icon 
                    name='ios-arrow-round-back'
                    type='ionicon'
                    onPress={props.goBack}
                    containerStyle={styles.icon}
                    color='#000'
                    size={36}
                />
                <Text style={{...props.style,...styles.darktext}}>{ props.title }</Text>
                {props.show ? (props.rightButton) : null}
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        width: '100%',
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    icon: {
        flex: 2,
    },
    text: {
        flex: 6,
        color: '#fff',
        fontSize: 18,
    },
    avatar: {
        flex: 2,
    },
    darktext: {
        flex: 6,
        color: '#000',
        fontSize: 18,
    },
});