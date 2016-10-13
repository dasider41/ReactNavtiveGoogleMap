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

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -36.848461;
const LONGITUDE = 174.763336;
const LATITUDE_DELTA = 0.122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class DefaultMarkers extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        a: {
          latitude: LATITUDE + SPACE,
          longitude: LONGITUDE + SPACE,
        },
        b: {
          latitude: LATITUDE - SPACE,
          longitude: LONGITUDE - SPACE,
        },
        c: {
          latitude: LATITUDE - (SPACE * 2),
          longitude: LONGITUDE - (SPACE * 2),
        },
        d: {
          latitude: LATITUDE - (SPACE * 3),
          longitude: LONGITUDE - (SPACE * 3),
        },
        e: {
          latitude: LATITUDE - (SPACE * 4),
          longitude: LONGITUDE - (SPACE * 4),
        },
      };
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
              <MapView.Marker
                identifier="Marker1"
                coordinate={this.state.a}
              />
              <MapView.Marker
                identifier="Marker2"
                coordinate={this.state.b}
              />
              <MapView.Marker
                identifier="Marker3"
                coordinate={this.state.c}
              />
              <MapView.Marker
                identifier="Marker4"
                coordinate={this.state.d}
              />
              <MapView.Marker
                identifier="Marker5"
                coordinate={this.state.e}
              />
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
