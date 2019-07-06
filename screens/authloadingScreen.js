import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { addProp, addUser } from '../redux/actions';
import { getProps } from '../db/database';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
      getProps(this.props.addProp, this.onSuccess);
      //this._bootstrapAsync();
  }

  onSuccess = () => this._bootstrapAsync()

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    
    const userToken = await AsyncStorage.getItem('userToken');

    this.props.addUser(userToken);
    if(userToken){

    }

    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(null,{ addProp, addUser })(AuthLoadingScreen);