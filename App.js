import React from 'react';
import {registerRootComponent} from 'expo';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import MainContainer from './src/MainContainer';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <MainContainer/>
      </Provider>
    )
  }
}

registerRootComponent(App);
