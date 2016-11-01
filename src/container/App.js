import React from 'react';
import {
  View,
  Text,
  Navigator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  BackAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Map from '../component/Map';

let navigator;

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

class SearchBar extends React.Component{
    render(){
      return (
        <View style={styles.searchView}>
          <TextInput style={styles.searchBar}
            placeholder="Search by address or school name"
            placeholderTextColor="#778899"
            underlineColorAndroid="rgba(0,0,0,0)"
            autoCorrect={false}
          />
          <Icon style={styles.searchIcon} name="md-search"/>
        </View>
      );
    }
}

export default class App extends React.Component{

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }

  routeMapper = {
    LeftButton: (route, navigator, index, navState) =>
      {
          return (<TouchableOpacity
            underlayColor='transparent'
            onPress={() => {navigator.pop()}}>
            <Icon style={styles.navBackBtn} name="md-menu"/>
          </TouchableOpacity>);
      },
      // { return null; },
    RightButton: (route, navigator, index, navState) =>
      { return null; },
    Title: (route, navigator, index, navState) =>
      {
        if (index > 0) {
           return ( <Text style={styles.navTitle}>{route.title}</Text> );
        }
        return ( <SearchBar/> );
      },
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => this.handleBackButton());
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => this.handleBackButton());
  }

  handleBackButton() {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
  }

  render(){
    return (
      <Navigator
        initialRoute={{
          index: 0,
          display: true,
          component: Map,
        }}
        ref={(nav) => { navigator = nav; }}
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
    backgroundColor: 'rgba(79, 142, 247,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navTitle: {
    alignItems: 'center',
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "#ddd",
  },
  navBackBtn: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 28,
    color: "#ddd",
  },
  searchView: {
    marginTop: 5,
    backgroundColor: '#fff',
    height:45,
    flexDirection: 'row',
    borderRadius: 3,
  },
  searchIcon: {
    marginTop: 10,
    marginRight: 15,
    fontSize: 28,
    color: "#778899",
  },
  searchBar: {
    marginTop: 5,
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
    color: "#778899",
    width: 350//TODO::fix to flex value
  },
});
