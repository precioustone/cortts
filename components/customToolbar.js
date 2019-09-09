import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export const Toolbar = (props) => {
    return (
        <ImageBackground source={require('../assets/dash.png')} style={{width: '100%', height: 300}}>
            <View style={styles.view}>
                <Text style={props.style}>{ props.title }</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
});
