import React, { Component } from 'react';
import { Dimensions, Image,StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class EditListing extends Component{

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        let scrollValue = 0;
        setInterval(function(){
          scrollValue = scrollValue + width;   // width = screen width 
          _scrollView.scrollTo({x: scrollValue}) 
        }, 3000);
    }

    render(){
        return (
            <View>
                <ScrollView 
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    horizontal={true} pagingEnabled={true} 
                    >
                    <Image source={require('../assets/sign1.png')} style={{height, width}} />
                    <Image source={require('../assets/sign2.png')} style={{height, width}} />
                </ScrollView>
            </View>
        );
    };
}