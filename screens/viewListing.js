import React, { Component } from 'react';
import { Image,StyleSheet, ScrollView, View } from 'react-native';
import * as Font  from 'expo-font';
import ActionButton from 'react-native-action-button';
import { Ionicons, Zocial } from '@expo/vector-icons';

import Header from '../components/customHeader';




export default class ViewListing extends Component{

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'gotham-light': require('../assets/fonts/GothamMedium.ttf'),
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
            this.state.fontLoaded && ( <View style={styles.container}>
            
                <Header
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={'Cortts Property Listing'}
                    initials='AE'
                    style={{fontFamily: 'gotham-light'}}
                />
            
                <ScrollView  >
                    
                </ScrollView>
                <ActionButton buttonColor="#26B469">
                    <ActionButton.Item buttonColor='#9b59b6' title="Edit" onPress={() => this.props.navigation.navigate('Edit')}>
                        <Ionicons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Save As pdf" onPress={() => {}}>
                        <Zocial name="acrobat" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Print" onPress={() => {}}>
                        <Ionicons name="md-print" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>)
        );
    };
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#fff',
    },
});