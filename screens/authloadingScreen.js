import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import  { resume } from '../redux/auth/actions';
import { updateProp } from '../redux/props/actions';
import Props from '../db/props';



class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      msg: null,
    }
  }

  async componentDidMount() {
      
      //Props.getImages(this.props.uploadImage, this.onSuccess, this.onError);
      const userToken = await AsyncStorage.getItem('userToken');
      
      if(userToken)
        this.props.resume(JSON.parse(userToken), this.onSuccess, this.onError);
      else
        this.props.navigation.navigate('Auth');

  }

  onSuccess = () => this.props.navigation.navigate('Main');

  splitdate = (date) => {
    return date.split('-');
  }

  splitTime = (time) => {
    return time.split(':');
  }

  

  compare = async (array) => {

      let max = null;

      array.forEach(element => {
          let dateTime = element.modified.split(' ');
          let date = this.splitdate(dateTime[0]);
          let time = this.splitTime(dateTime[1]);
          if(max == null)
            max = element.modified;
          else{
            let maxdateTime = element.modified.split(' ');
            let maxdate = this.splitdate(maxdateTime[0]);
            let maxtime = this.splitTime(maxdateTime[1]);
            let date1 = new Date(date[0],date[1],date[2],time[0],time[1],time[2]);
            let date2 = new Date(maxdate[0],maxdate[1],maxdate[2],maxtime[0],maxtime[1],maxtime[2]);

            if(date1 >= date2){
              max = element.modified;
            }
          }
      });
      await AsyncStorage.setItem('lastModified', max);

  }

  onError = (msg, status) => {
      this.setState({msg, status});
      
      showMessage({
          message: this.state.msg,
          type: "danger",
          autoHide: false,
      });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    
    const userToken = await AsyncStorage.getItem('userToken');
  
    this.props.resume(JSON.parse(userToken), this.onSuccess, this.onError);

    this.props.navigation.navigate('Main');
  };

  // Render any loading content that you like here
  render() {
    return (
      <ImageBackground source={require("../assets/splash.png")} style={{flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center'}}>
        {this.state.status ? <ActivityIndicator/> : null}
        <StatusBar barStyle="default" />
        
      </ImageBackground>
    );
  }
}

export default connect(null,{ updateProp, resume })(AuthLoadingScreen);