import * as React from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBmz4eFhvaBX6weQdJuY8NOxv-Vn0Ojnj0",
  authDomain: "newanimebeltt.firebaseapp.com",
  databaseURL: "https://newanimebeltt.firebaseio.com",
  projectId: "newanimebeltt",
  storageBucket: "",
  messagingSenderId: "712845941423",
  appId: "1:712845941423:web:e4b0db957969af5bc5925a"

};
firebase.initializeApp(config);

export default class ImagePickerExample extends React.Component {
  constructor(props){
    super(props);
    this.database = firebase.database();
 
    this.grayImagesRef = this.database.ref('grayImages/'+Date.now());


}


  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

   // console.log('r= ',result);

    if (!result.cancelled) {
      // this.setState({ image: result.uri });
      
    //  fetch('https://us-central1-cloud-function-tutorial-8b196.cloudfunctions.net/uploadimage', {
     
        fetch('https://us-central1-newanimebeltt.cloudfunctions.net/uploadimage', {
      
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64: result.base64,
        }),
      }).then((response) => {
        return response.text();
      }).then((text) => {
        // let str = text;
        // console.log(str.slice(22,100));
        // let gray_uri = str.slice(22,str.length);
        this.setState({image: text});
      //  console.log('text = ',this.state.image)
        
        this.grayImagesRef.set({
          Image:this.state.image
        });
      
      })

    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
