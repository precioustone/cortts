import React, { Component } from 'react';
import { Provider } from 'react-redux'


// Import All Navigator stacks
import Nav from './NavigationsStacks';
import store from './redux/store'

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  }
}
