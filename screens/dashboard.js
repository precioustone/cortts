import React, { Component } from 'react';
import { AsyncStorage, Platform, RefreshControl, StatusBar,StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Avatar, SearchBar, Tooltip } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { showMessage} from 'react-native-flash-message';

import { Toolbar } from '../components/customToolbar';
import { getProperties, getUser } from '../redux/selectors';
import { addProp, delProp, filterProp } from '../redux/actions';
import { delPropFmDb, getUpdates } from '../db/database';



class Dashboard extends Component{

    static navigationOptions = {
        header: null,
    };

    state = {
        refreshing: false,
        fontLoaded: false,
        user: this.props.userToken,
        search: '',
        searchData: this.props.properties,
        searchEnabled: false,
        msg: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'gotham-medium': require('../assets/fonts/GothamMedium.ttf')
        });

        this.setState({fontLoaded: true});

        StatusBar.setBarStyle('light-content');

        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
        }
        console.log(this.props);
        
    }

    //////////////////////////////////////////////////////////////
   ////////////////////HELPER FUNCTIONS//////////////////////////
  //////////////////////////////////////////////////////////////


    //REMOVE ROW ON DELETE
    closeRow = (rowMap, rowKey) => {
        if ( rowMap[rowKey] ){
            rowMap[rowKey].closeRow();
        }
    };

    //DELETE FUNCTION
    deleteRow = (rowMap, rowKey) => {
        this.closeRow(rowMap,rowKey);
        //const newData = [...this.props.properties];
		//const prevIndex = this.props.properties.findIndex(item => item.key === rowKey);
		//newData.splice(prevIndex, 1);
        //this.setState({listViewData: newData});
        delPropFmDb(rowKey, this.props.delProp);
        //this.props.delProp(rowKey);
    };

    //EDIT FUNCTION
    handleEdit = (data) =>{
        this.props.navigation.navigate('Edit', { 'id': data.key, })
    };

    //NAVIGATE TO PROPERTY DESCRIPTION
    handleView = (data) =>{
        this.props.navigation.navigate('View', { 'id': data.key, })
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        getUpdates(this.props.addProp, this.onSuccess, this.onError)
    }

    onSuccess = () => {
        this.setState({refreshing: false});
    }

    onError = (msg) => {
        console.log(msg)
        this.setState({msg, refreshing: false});
      
        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: false,
        });
    }

    search = (search) => {
        this.setState({search})
        let searchData;
        if(search != '')
            searchData = this.props.properties.filter( (value, index) => value['title'].includes(this.state.search));
        else
            searchData = this.props.properties;

        this.setState({searchData});
        //this.props.filterProp(search);
    }

    _logout = async () =>{
        await AsyncStorage.clear();
        //this.props.delProp();
        this.props.navigation.navigate('AuthLoader');
    };

    //////////////////////////////////////////////////////////////
   ////////////////////COMPONENT FUNCTIONS///////////////////////
  //////////////////////////////////////////////////////////////


    //CUSTOM TOOLBAR
    renderToolBar = () => (
        <Toolbar 
            style={{ fontFamily: 'gotham-medium', color: '#fff', fontSize: 50 }} 
            title={'Hi '+this.state.user.fullname.split(' ')[0]}
        />
    );
    
    //FLATLIST FUNCTION OR CONTENT BELOW COLLAPSING TOOLBAR
    renderContent = () => (
        <SwipeListView
            useFlatList
            data={this.state.searchEnabled ? this.state.searchData : this.props.properties}
            renderItem={ (data, rowMap) => (
                <TouchableOpacity
                    onPress={() => this.handleView(data.item)}
                    activeOpacity={1.0}    
                >
                    <View style={styles.rowFront}>
                        <Text style={{fontFamily: 'gotham-medium', fontSize: 18}}>{data.item.title}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'gotham-medium', color: '#02B598', flex: 6}}>{data.item.area}</Text>
                            <Text style={{fontFamily: 'gotham-medium', color: '#03C06A', flex: 4}}>{data.item.added_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity style={{...styles.backRightBtn, ...styles.backRightBtnLeft}}
                        onPress={() => this.deleteRow(rowMap, data.item.key)}
                    >
                        <View style={{...styles.backRightBtn, ...styles.backRightBtnLeft}}>
                            <Ionicons name="md-trash" style={styles.actionButtonIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.backRightBtn, ...styles.backRightBtnRight}}
                        onPress={() => this.handleEdit(data.item)}
                    >
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


    // NAVBAR FUNCTION
    renderNavBar = () => (
        !this.state.searchEnabled ? (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                paddingHorizontal: 15
            }}
        >
            
            <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'gotham-medium', flex: 9 }}>Cortts Property Listing</Text>
            <Ionicons 
                name='ios-search' 
                size={24} 
                style={{color: '#FFF', paddingHorizontal: 15}}
                onPress={() => this.setState({searchEnabled: true})}
            />
            <Tooltip 
                popover={<ExtraComponent onPress={this._logout} />}
                backgroundColor='#F9F9F9'
            >
                <Ionicons 
                    name='ios-more' 
                    size={24} 
                    style={{color: '#FFF', transform: [{rotate: '90deg'}]}}
                    
                />
            </Tooltip>
            {/*<Avatar 
                containerStyle={styles.avatar}    
                overlayContainerStyle={{backgroundColor: '#FF7F50'}}               
                size="small"
                rounded
                title='AE'
                activeOpacity={0.7} 
                onPress={() => {}}
            />*/}
            
        </View>): (<View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    paddingHorizontal: 15,
                    position: 'absolute',
                    top: 0,
                    paddingTop: 40,
                    elevation: 4,
                    backgroundColor: '#F9F9F9',
                }}
            >
            
                <SearchBar 
                    platform='android'
                    onChangeText={this.search }
                    onCancel={ () => this.setState({listViewData: this.props.properties, searchEnabled: false})}
                    onClear={() => this.setState({listViewData: this.props.properties, searchEnabled: false})}
                    value={this.state.search}
                    containerStyle={{width: '100%', backgroundColor: 'transparent'}}
                    inputContainerStyle={{width: '100%', backgroundColor: 'transparent'}}
                />
                
        </View> )
           
    );

     ////////////////////////////////////////////////////////
    ////////////////////VIEW RENDER CODE////////////////////
   //////////////////////////////////////////////////////// 
    render() {

        const { navigate } = this.props.navigation;

        return (
           
            <View style={{flex: 1}}>
                { this.state.fontLoaded ? (
                <CollapsibleToolbar
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            enabled={true}
                        />
                    }
                    renderContent={this.renderContent}
                    renderNavBar={this.renderNavBar}
                    imageSource='https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                    renderToolBar={this.renderToolBar}
                    collapsedNavBarBackgroundColor='#009688'
                    translucentStatusBar
                    showsVerticalScrollIndicator={false}
                    toolBarHeight={300}
                />) : null }

                <ActionButton buttonColor="#51CCE3" 
                    style={{position: 'absolute'}} 
                    onPress={ () => navigate('Create') }
                />
                    
                   
            </View>          

        );
    }
}

const ExtraComponent = (props) =>{
    return (<TouchableOpacity onPress={() => props.onPress()}>
        <View>
            <Text>Logout</Text>
        </View>
    </TouchableOpacity>);
}

const mapStateToProps = ( state ) => {
    return { userToken: getUser(state), properties: getProperties(state) };
}


export default connect(
mapStateToProps,
{ addProp, delProp, filterProp }
)(Dashboard)


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
        fontFamily: 'gotham-medium',
		backgroundColor: '#FFF',
		borderBottomColor: '#C0C0C0',
        borderBottomWidth: 1,
        paddingLeft: 40,
        paddingRight: 15,
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