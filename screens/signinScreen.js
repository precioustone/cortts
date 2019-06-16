import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, ScrollView, View } from 'react-native';

import * as Font from 'expo-font';

import { ButtonThick, ButtonTrans } from '../components/button.js';


const { width, height } = Dimensions.get('window');

export default class SignInScreen extends Component{

    static navigationOptions = {
        header: null,
    };

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf'),
          });
      
        this.setState({ fontLoaded: true });

        const numOfBackground = 2;
        let scrollValue = 0, scrolled = 0;
        setInterval(function () {
            scrolled++;
            if(scrolled < numOfBackground)
                scrollValue = scrollValue + width;
            else{
                scrollValue = 0;
                scrolled = 0
            }
            let sc = _scrollView;
            if(sc != null){
                sc.scrollTo({ x: scrollValue, animated: false })
            }
            //_scrollView.scrollTo({ x: scrollValue, animated: false })
        }, 3000);
    }

    render(){
        return (
            this.state.fontLoaded ? (
            <View>
                <ScrollView 
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    horizontal={true} pagingEnabled={true} 
                    >
                    <Image source={require('../assets/sign1.png')} style={{height, width}} />
                    <Image source={require('../assets/sign2.png')} style={{height, width}} />
                </ScrollView>
                <View style={styles.centerContainer}>
                    <Image source={require('../assets/icon2.png')} style={{width: 200, height: 200}} />

                </View>
                <View style={styles.container}>
                    
                    <ButtonThick 
                        style={styles.thickText}
                        text= 'Create Account'
                        onClick={() => this.onclickHandler('Register')}
                        containerStyle={{ backgroundColor: '#FFF', borderColor: "#FFF" }}
                    />
                   
                    
                    <ButtonTrans
                        style={styles.transText}
                        text= 'Login'
                        onClick={() => this.onclickHandler('Login')}
                        containerStyle={{ backgroundColor: 'transparent', borderColor: "#FFF" }}
                    />
                </View>
            </View>) : null
        );
    };

    onclickHandler = (screen) =>{
        const {navigate} = this.props.navigation;
        navigate(screen);
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20
    },
    thickText: {
        color: "#000",
        padding: 10,
        fontWeight: 'bold',
        fontFamily: 'raleway-bold',
    },
    transText: {
        color: "#fff",
        padding: 10,
        fontFamily: 'raleway-bold',
    },
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    centerContainer: {
        position: 'absolute',
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});