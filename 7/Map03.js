import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView from 'react-native-maps';
var {width, height} = Dimensions.get('window');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 13.764884,
        longitude: 100.538265,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      markers:[
          {
            latlng: {latitude: 13.764884, longitude: 100.538265},
            title: "Victory Monument",
            description: "A large military monument in Bangkok, Thailand."
          },
          {
            latlng: {latitude: 13.763681, longitude: 100.538125},
            title: "Saxophone Club",
            description: "A music pub for saxophone lover"
          },
          {
            latlng: {latitude: 13.764595, longitude: 100.537438},
            title: "Coco Department Store",
            description: "A fashion department store"
          }
      ]
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  onRegionChangeComplete(region) {
    this.setState({region});
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
        {this.state.markers.map((marker,i) => {
          return(
          <MapView.Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />);
        })}
        </MapView>
        <View style={styles.container}>
          <Text>
            Latitude: {this.state.region.latitude}{'\n'}
            Longitude: {this.state.region.longitude}{'\n'}
            LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
            longitudeDelta: {this.state.region.longitudeDelta}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: width,
    height: Math.floor(height*2/3)
  }
});