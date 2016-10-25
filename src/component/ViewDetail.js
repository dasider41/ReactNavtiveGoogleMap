import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class ViewDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  getStudentStatus(total, parameter) {
    return parameter + " (" + parseFloat(parameter > 0 ? (parameter / total) * 100 : 0).toFixed(2) + "%)";
  }

  render () {
    const { school } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.cols}>Name : {school.name}</Text>
        <Text style={styles.cols}>Phone : {school.telephone} / Fax {school.fax}</Text>
        <Text style={styles.cols}>Email : {school.email}</Text>
        <Text style={styles.cols}>Website : {school.website}</Text>
        <Text style={styles.cols}>Address : {school.street+' '+school.suburb+' '+school.city}</Text>
        <Text style={styles.cols}>Ward : {school.ward}</Text>
        <Text style={styles.cols}>School Type : {school.type}</Text>
        <Text style={styles.cols}>Gender of Studnets : {school.gender}</Text>

        <Text style={styles.cols}>Total School Roll : {school.total} ({100}%)</Text>
        <Text style={styles.cols}>
          European / Pakeha : {this.getStudentStatus(school.total, school.european)},
          Maori : {this.getStudentStatus(school.total, school.maori)},
          Pasifika : {this.getStudentStatus(school.total, school.pasifika)}
        </Text>
        <Text style={styles.cols}>
          Asian : {this.getStudentStatus(school.total, school.asian)},
          MELAA : {this.getStudentStatus(school.total,school.melaa)},
          Other : {this.getStudentStatus(school.total,school.other)}
        </Text>
        <Text style={styles.cols}>
          International Students : {this.getStudentStatus(school.total,school.international)}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical:60,
    paddingHorizontal:10
  },
  cols: {
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 12,
    paddingHorizontal:5,
    borderRadius: 5,
    marginVertical: 5,
  },
});
