import React from 'react';
import { AppRegistry } from 'react-native';
import ViewsAsMarkers from './App';

class AirMapsExplorer extends React.Component {
  render() {
    return <ViewsAsMarkers />;
  }
}

AppRegistry.registerComponent('AirMapsExplorer', () => AirMapsExplorer);
