import React, { Component } from 'react';
import { Provider } from 'react-redux'
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';


// Import All Navigator stacks
import Nav from './NavigationsStacks';
import store from './redux/store'

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Nav />
        <FlashMessage position='top' animated={true} />
      </Provider>
    );
  }
}
