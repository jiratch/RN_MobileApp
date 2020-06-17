import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native';

import MapView from 'react-native-maps';
var {width, height} = Dimensions.get('window');

export default class AppMaps extends Component {

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
            image: require('../images/photo-camera.png'),
            photo: require('../images/victory-monument.jpg'),
            title: "Victory Monument",
            description: "A large military monument in Bangkok, Thailand."
          },
          {
            latlng: {latitude: 13.763681, longitude: 100.538125},
            image: require('../images/music-player.png'),
            photo: require('../images/saxophone-pub.jpg'),
            title: "Saxophone Club",
            description: "A music pub for saxophone lover"
          },
          {
            latlng: {latitude: 13.764595, longitude: 100.537438},
            image: require('../images/shopping-bag.png'),
            photo: require('../images/coco.jpg'),
            title: "Coco Department Store",
            description: "A fashion department store"
          }
      ]
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
  }

  onRegionChangeComplete(region) {
    this.setState({region});
  }

  moveMaptoLocation(region) {
    console.log(region);
    this.refs.map.animateToRegion(region, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          ref="map"
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
          <View style={{padding: 5}}>
            <Button
              title="Victory Monument"
              onPress={() => this.moveMaptoLocation({latitude: 13.764884, longitude: 100.538265, latitudeDelta: 0.002, longitudeDelta: 0.002})}
            />
          </View>
          <View style={{padding: 5}}>
            <Button
              title="Saxophone Club"
              onPress={() => this.moveMaptoLocation({latitude: 13.763681, longitude: 100.538125, latitudeDelta: 0.002, longitudeDelta: 0.002})}
            />
          </View>
          <View style={{padding: 5}}>
            <Button
              title="Coco Department Store"
              onPress={() => this.moveMaptoLocation({latitude: 13.764595, longitude: 100.537438, latitudeDelta: 0.002, longitudeDelta: 0.002})}
            />
          </View>
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
  },
  callout:{
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10,
    marginRight: 10,
    marginBottom: 10
  },
  calloutPhoto:{
    flex: 1,
    width: 166,
    height: 83
  },
  calloutTitle:{
    fontSize: 16,
  }
});