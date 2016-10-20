import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MapView from 'react-native-maps';

import CustomMarker from './CustomMarker';
import ViewDetail from './ViewDetail';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -36.848461;
const LONGITUDE = 174.763336;
const LATITUDE_DELTA = 0.050;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const MIN_LONGITUDE_DELTA = 0.25;

const REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
}

const jsonData = require('../data/school.json');
const jsonDataSchool = jsonData.schools;

function getBoundByRegion(object, center) {
  const langLat = getLangLati(object);
  return ( langLat.latitude >= (center.latitude - (center.latitudeDelta / 2) ) &&
    langLat.latitude <= (center.latitude + (center.latitudeDelta / 2)) &&
    langLat.longitude >= (center.longitude - (center.longitudeDelta / 2)) &&
    langLat.longitude <= (center.longitude + (center.longitudeDelta / 2)) &&
    center.latitudeDelta <= MIN_LONGITUDE_DELTA
  ) ? true : false;
}

function getLangLati(object) {
  return ({
    latitude : Number(object.latitude),
    longitude : Number(object.longitude)
  });
}

export default class DisplaySchools extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      region : REGION,
      schools : [],
      events: [],
      selectedMarker: []
     };
  }

  reDrawMarks() {
    return e => {
      const events = JSON.stringify(e, null, 2);
      const newRegion = {
        latitude: e.latitude,
        longitude: e.longitude,
        latitudeDelta: e.latitudeDelta,
        longitudeDelta: e.longitudeDelta,
      };
      this.setState({
        schools: jsonDataSchool.filter((school) => {
          return getBoundByRegion(school, newRegion);
        }),
        events: events
      });
    }
  }

  viewDetail(schoolId){
    this.props.navigator.push({
      title: "Detail",
      index: 1,
      display: true,
      component: ViewDetail,
      schooId: schoolId
    })
  }

  render() {
    return (
      <View style={styles.container}>
            <MapView
              provider={this.props.provider}
              ref={ref => { this.map = ref; }}
              style={styles.map}
              onRegionChangeComplete={this.reDrawMarks()}
              initialRegion={this.state.region}
              >
            {this.state.schools.map((school) => {
              return  (
                <MapView.Marker
                  key={school.schoolId}
                  title={school.name}
                  onPress={ () => {this.setState({selectedMarker: school.schoolId})}}
                  coordinate={getLangLati(school)}
                >
                  <CustomMarker name={school.name} />
                </MapView.Marker>
              );
            })}
          </MapView>
          <View style={styles.events}>
            <Text>
              {this.state.events}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.bubble} onPress={()=> this.viewDetail(this.state.selectedMarker)}
            >
              <Text>View {this.state.selectedMarker}</Text>
            </TouchableOpacity>
          </View>

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
  events: {
    position: 'absolute',
    top: height / 1.5,
    left: 0,
    right: 0,
    bottom: 0,
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
