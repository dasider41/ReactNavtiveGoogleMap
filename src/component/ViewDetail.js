import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

import Pie from './chart/Pie';
import Theme from './chart/theme';

class ViewText extends React.Component {
  render(){
    return (
      <View style={styles.rows}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.detail}>{this.props.name}</Text>
      </View>
    );
  }
}

class ViewURL extends React.Component {
  render(){
    return (
      <View style={styles.rows}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableHighlight
          style={styles.detail}
          underlayColor="#3C5EAE"
          onPress={()=>
            {ToastAndroid.show("Open URL " + this.props.url, ToastAndroid.SHORT);}}
            >
            <Text style={styles.link}>{this.props.url}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class ViewRow extends React.Component {
  render () {
    if(this.props.title === 'Website'){
      return(
        <ViewURL title={this.props.title} url={this.props.name} />
      );
    }else{
      return(
        <ViewText title={this.props.title} name={this.props.name} />
      );
    }
  }
}

export default class ViewDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const height = 200;
    const width = 500;

    const { school } = this.props;
    const lists = [
      {
        id : 1,
        title : "Name",
        detail : school.name,
      },
      {
        id : 2,
        title : "Phone",
        detail : school.telephone,
      },
      {
        id : 3,
        title : "Email",
        detail : school.email,
      },
      {
        id : 4,
        title : "Website",
        detail : school.website,
      },
      {
        id : 5,
        title : "Address",
        detail : school.street+' '+school.suburb+' '+school.city,
      },
      {
        id : 6,
        title : "Ward",
        detail : school.ward,
      },
      {
        id : 7,
        title : "School Type",
        detail : school.type,
      },
      {
        id : 8,
        title : "Gender of Studnets",
        detail : school.gender,
      },
      {
        id : 9,
        title : "School Type",
        detail : school.type,
      },
    ];

    let Studnets = [
      {"number": school.european, "name": 'European / Pakeha'},
      {"number": school.asian, "name": 'Asian'},
      {"number": school.maori, "name": 'Maori'},
      {"number": school.pasifika, "name": 'Pasifika'},
      {"number": school.melaa, "name": 'MELAA'},
      {"number": school.international, "name": 'International Students'},
      {"number": school.other, "name": 'Other'},
    ];

    Studnets.sort(function (a, b) {
      if (a.number < b.number) {
        return 1;
      }
      if (a.number > b.number) {
        return -1;
      }
      return 0;
    });

    return (
      <ScrollView style={styles.container}>
        {lists.map((list) => {
          return (
              <ViewRow key={list.id} title={list.title} name={list.detail}/>
          );
        })}

        <View style={styles.separator} />

        <Text style={styles.title}>Total School Roll : {school.total}</Text>
        <View style={styles.chart} >
          <Pie
            pieWidth={150}
            pieHeight={150}
            colors={Theme.colors}
            width={width}
            height={height}
            total={school.total}
            data={Studnets} />
        </View>
        <View style={styles.bottom} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical:60,
    paddingHorizontal:10
  },
  rows : {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 5,
    marginVertical: 5,
  },
  title: {
    flex: 2,
    paddingVertical: 10,
    paddingHorizontal:10,
    color: '#ffffff',
    backgroundColor: 'rgba(79, 142, 247,0.7)',
  },
  detail: {
    flex: 5,
    paddingVertical: 10,
    paddingHorizontal:10,
  },
  link: {
    color: '#3C5EAE',
  },
  separator: {
    height: 0.5,
    marginVertical: 10,
    backgroundColor: 'rgba(79, 142, 247,0.4)',
  },
  bottom: {
    marginVertical: 20,
  },
  chart: {
    backgroundColor:'whitesmoke',
    marginBottom: 21,
  },
});
