import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MapView from 'react-native-maps';

const schoolJsonData = require('./school.json');

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -36.848461;
const LONGITUDE = 174.763336;
const LATITUDE_DELTA = 0.122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function getLangLati(object) {
  return ({
    "latitude" : Number(object.latitude),
    "longitude" : Number(object.longitude)
  });
}

export default class DefaultMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = schoolJsonData;
  }

  render() {
    return (
      <View style={styles.container}>
            <MapView
              provider={this.props.provider}
              ref={ref => { this.map = ref; }}
              style={styles.map}
              initialRegion={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              >
            {this.state.schools.map((school) => {
              return  (
                <MapView.Marker
                  key={school.schoolId}
                  title={school.name}
                  description={school.name}
                  coordinate={getLangLati(school)}
                >
                </MapView.Marker>
              );
            })}
          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // bubble: {
  //   backgroundColor: 'rgba(255,255,255,0.7)',
  //   paddingHorizontal: 18,
  //   paddingVertical: 12,
  //   borderRadius: 20,
  // },
  // latlng: {
  //   width: 200,
  //   alignItems: 'stretch',
  // },
  // button: {
  //   width: 80,
  //   paddingHorizontal: 12,
  //   alignItems: 'center',
  //   marginHorizontal: 10,
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   marginVertical: 20,
  //   backgroundColor: 'transparent',
  // },
});

// module.exports = DefaultMarkers;
