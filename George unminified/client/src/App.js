import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Index from './components/Index';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    )
  }
}

export default App;
