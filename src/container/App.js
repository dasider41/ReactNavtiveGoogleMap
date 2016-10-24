import React from 'react';
import {
  View,
  Text,
  Navigator,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  PixelRatio,
} from 'react-native';

import Map from '../component/Map';

class NavigationBar extends Navigator.NavigationBar {
  render() {
    var routes = this.props.navState.routeStack;

    if (routes.length) {
      var route = routes[routes.length - 1];

      if (route.display === false) {
        return null;
      }
    }
    return super.render();
  }
}

export default class App extends React.Component{

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }

  routeMapper = {
    LeftButton: (route, navigator, index, navState) =>
      {
        if(route.index > 0) {
          return <TouchableOpacity
            underlayColor='transparent'
            onPress={() => {if (index > 0) {navigator.pop()}}}>
            <Text style={styles.navBackBtn}> Back </Text>
          </TouchableOpacity>;
        }else{
          return null;
        }
      },
    RightButton: (route, navigator, index, navState) =>
      { return null; },
    Title: (route, navigator, index, navState) =>
      { return (<Text style={styles.navTitle}>{route.title}</Text>); },
  };

  render(){
    return (
      <Navigator
        initialRoute={{
          title: 'Map',
          index: 0,
          display: true,
          component: Map,
        }}
        configureScene={this.configureScene}
        renderScene={(route, navigator) => {
          return <route.component
            navigator={navigator}
            title={route.title}
            school={route.school}
            index={route.index} />
        }}
        navigationBar={
          <NavigationBar
            routeMapper={this.routeMapper}
            style={styles.navBar}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navTitle: {
    alignItems: 'center',
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  navBackBtn: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: "#555",
  },
});
