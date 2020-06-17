import React from 'react';
import { Text, View, TouchableOpacity, Image, CameraRoll } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import ImagePickerExample from './ImagePicker'





 
export default class CameraExample extends React.Component {
 
  state = {
    hasCameraPermission: null,
    hasCameraRollPermission: null,
    type: Camera.Constants.Type.back,
  };
  
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: status2 === 'granted' });
  }

  handleFacesDetected = ({ faces }) => {
    console.log(faces);
  }


  takePicture = async () => {
    console.log('taken');
    if (this.refs.camera) {
      let photo = await this.refs.camera.takePictureAsync();
      console.log(photo.uri);
 
      CameraRoll.saveToCameraRoll(photo.uri).then(() => {
        console.log('saved to galley');
      });
    }
  }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }}
            type={this.state.type}
            ref="camera"
            onFacesDetected={this.handleFacesDetected}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 15, marginTop: 20, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 5,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                margin: 15
              }}>
                <ImagePickerExample/>
              
                </View>

            <View
              style={{
                flex: 5,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                margin: 20
              }}>
                 
             
              <TouchableOpacity
                style={{
                  flex: 1.0,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.takePicture}>
                {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text> */}
                <Image source={require('./shutter.png')}/>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
