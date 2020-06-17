import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView from 'react-native-maps';
var {width, height} = Dimensions.get('window');

export default class AppLo extends Component {

  constructor(props) {
    super(props);  
    this.state = {
      location: null,
      errorMessage: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  onRegionChangeComplete(region) {
    this.setState({region});
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location);
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    // console.log(region);
    this.setState({
      region:region,
      location: location
    });
  };

  getJSXshow(error) {
    if(error)
      return <Text style={styles.paragraph}>{this.state.errorMessage}</Text>
    else{
      return (
        <MapView style={styles.map}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          <MapView.Marker
            key={'key'}
            coordinate={{latitude: this.state.region.latitude,
               longitude: this.state.region.longitude}}
            title={'my location'}
          />
        </MapView>
      );
    }
  }

  render() {
    // let text = 'Waiting..';
    let error;
    if (this.state.errorMessage) {
      error = true;
    } else if (this.state.location) {
      error = false;
    }

    return (
      <View style={styles.container}>
        {this.getJSXshow(error)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: width,
    height: height
  }
});


