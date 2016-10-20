import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/container/App';

class RNGmap extends React.Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('RNGmap', () => RNGmap);
