import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

const Header = (props) => {
    return (
        <ImageBackground source={require('../assets/header.png')} style={{width: '100%', height: 100}}>
            <View style={styles.view}>
                <Icon 
                    name='ios-arrow-round-back'
                    type='ionicon'
                    onPress={props.goBack}
                    containerStyle={styles.icon}
                    color='#fff'
                    size={48}
                />
                <Text style={{...props.style,...styles.text}}>{ props.title }</Text>
                {/*<Avatar 
                    containerStyle={styles.avatar}    
                    overlayContainerStyle={{backgroundColor: '#FF7F50'}}               
                    size="small"
                    rounded
                    title={props.initials}
                    onPress={props.initailFunction}
                    activeOpacity={0.7} 
                />*/}
            </View>
        </ImageBackground>
    );
};

export default Header;

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    icon: {
        flex: 2,
    },
    text: {
        flex: 6,
        color: '#fff',
    },
    avatar: {
        flex: 2,
    },
});