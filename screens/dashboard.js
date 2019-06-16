import React, { Component } from 'react';
import { Platform, StatusBar,StyleSheet, ScrollView, Text, View } from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Avatar, Icon } from 'react-native-elements';

import { Toolbar } from '../components/customToolbar';

//import NavBackButton from '../components/NavBackButton';



export default class Dashboard extends Component{

    static navigationOptions = {
        header: null,
    };

    state = {
        fontLoaded: false,
    };

    async componentWillMount() {

        await Font.loadAsync({
            'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf')
        });

        this.setState({fontLoaded: true});

        StatusBar.setBarStyle('light-content');

        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
        }
    }

    renderToolBar = () => (
        <Toolbar 
            style={{ fontFamily: 'raleway-bold', color: '#fff', fontSize: 50 }} 
            title='Hi Anita'
        />
    );

    renderContent = () => (
        <View>
            {new Array(20).fill().map((_, i) => (
                <View
                    // eslint-disable-next-line
                    key={i}
                    style={{
                        backgroundColor: '#F5F5F5',
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E5E5E5'
                    }}
                >
                    <Text>{`Item ${i + 1}`}</Text>
                </View>
            ))}
        </View>
    );

    renderNavBar = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                paddingHorizontal: 15
            }}
        >
            
            <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'raleway-bold', flex: 9 }}>Cortts Property Listing</Text>
            
            <Avatar 
                containerStyle={styles.avatar}    
                overlayContainerStyle={{backgroundColor: '#FF7F50'}}               
                size="small"
                rounded
                title='AE'
                activeOpacity={0.7} 
            />
            
        </View>
    );

    render() {
        return (
            <View style={{flex: 1}}>
                { this.state.fontLoaded ? (
                <CollapsibleToolbar
                    renderContent={this.renderContent}
                    renderNavBar={this.renderNavBar}
                    imageSource='https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                    renderToolBar={this.renderToolBar}
                    collapsedNavBarBackgroundColor='#009688'
                    translucentStatusBar
                    showsVerticalScrollIndicator={false}
                    toolBarHeight={300}
                />) : null }

                <ActionButton buttonColor="#51CCE3" style={{position: 'absolute'}}>
                    <ActionButton.Item buttonColor='#9b59b6' title="Add New property" onPress={() => this.props.navigation.navigate('Create')}>
                        <Ionicons name="md-add" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Edit" onPress={() => this.props.navigation.navigate('Edit')}>
                        <Ionicons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Delete" onPress={() => this.props.navigation.navigate('View')}>
                        <Ionicons name="md-trash" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    avatar: {
        flex: 1,
    },
  });