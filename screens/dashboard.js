import React, { Component } from 'react';
import { Platform, StatusBar,StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Avatar, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Toolbar } from '../components/customToolbar';
import { properties } from '../store/store';

//import NavBackButton from '../components/NavBackButton';



export default class Dashboard extends Component{

    static navigationOptions = {
        header: null,
    };

    state = {
        fontLoaded: false,
        listViewData: properties,
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
        <SwipeListView
            useFlatList
            data={this.state.listViewData}
            renderItem={ (data, rowMap) => (
                <TouchableOpacity
                    onPress={() => console.log(data.item.key)}
                    activeOpacity={1.0}    
                >
                    <View style={styles.rowFront}>
                        <Text style={{fontFamily: 'raleway-bold', fontSize: 20}}>{data.item.title}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'raleway-bold', color: '#02B598', flex: 6}}>{data.item.area}</Text>
                            <Text style={{fontFamily: 'raleway-bold', color: '#03C06A', flex: 4}}>{data.item.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity style={{...styles.backRightBtn, ...styles.backRightBtnLeft}}>
                        <View style={{...styles.backRightBtn, ...styles.backRightBtnLeft}}>
                            <Ionicons name="md-trash" style={styles.actionButtonIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.backRightBtn, ...styles.backRightBtnRight}}>
                        <View style={{...styles.backRightBtn, ...styles.backRightBtnRight}}>
                            <Ionicons name="md-create" style={styles.actionButtonIcon} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
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
    rowFront: {
        fontFamily: 'raleway-bold',
		backgroundColor: '#E5E5E5',
		borderBottomColor: '#C0C0C0',
        borderBottomWidth: 1,
        paddingHorizontal: 40,
        paddingTop: 30,
        paddingBottom: 10,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
    },
    backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'rgba(231,76,60,1)',
		left: 0,
	},
	backRightBtnRight: {
		backgroundColor: '#3498db',
        right: 0,
	},
  });