import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';


export default class Cortts extends Component{

    static navigationOptions = {
        header: null,
    };

    render(){
        return (
            <WebView 
                style={styles.webview}
                source={{uri: 'https://cortts.com'}}
            />
        );
    };
}

const styles = StyleSheet.create({
    webview: {
        flex: 1,
        marginTop: 25,
    }
});