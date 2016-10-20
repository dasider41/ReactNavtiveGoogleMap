import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
    TouchableOpacity,
} from 'react-native';


export default class ViewDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <View>
        <Text>Details {this.props.schooId}</Text>
      </View>
    );
  }
}
