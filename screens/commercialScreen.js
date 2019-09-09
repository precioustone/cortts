import React, { Component } from 'react';
import { Dimensions, Image,StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Commercial extends Component{

    static navigationOptions = {
        header: null,
    };

    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, width: '100%'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>COMING SOON</Text>
            </View>
        );
    };
}