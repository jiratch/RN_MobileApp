import React from 'react';
import { Text, View, Button ,Picker,TouchableOpacity,TextInput} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

var token;

export default class AppContainer extends React.Component {
  state = {
    notification: {},
    title:'',
    message:'',
    hours:'00',
    minute:'00'
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };
/////////////
 Cancle = ()=>{
  this._notificationSubscription.remove()
 }
  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    const message = {
      to: token,
      sound: 'default',
      title: this.state.title,
      body: this.state.hours+':'+this.state.minute+' '+this.state.message,
      data: { data: 'goes here' },
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = response._bodyInit;
    console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>

        <View>
        <Text style={{fontSize:50}}>{this.state.hours}:{this.state.minute}</Text>

        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'row' }}>
          
          <Text>Title: </Text>
          <TextInput onChangeText={(text) => this.setState({title:text})}
          value={this.state.title} style={{ 
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 25,
    width:100,
    margin:5,
    borderColor: "black"}} ></TextInput>
          
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'row' }}>
          
          <Text>Message: </Text>
          <TextInput onChangeText={(text) => this.setState({message:text})}
          value={this.state.message} style={{ 
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    margin:5,
    height:70,
    width:150,
    borderColor: "black"}} ></TextInput>
          
        </View>
        
        <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'row' }}>
          
          <Text>Hours: </Text>
          <TextInput onChangeText={(text) => this.setState({hours:text})}
          value={this.state.hours} style={{ 
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    margin:5,
    borderBottomWidth: 1,
    height:25,
    width:25,
    borderColor: "black"}} ></TextInput>
     <Text>Minute: </Text>
          <TextInput onChangeText={(text) => this.setState({minute:text})}
          value={this.state.minute} style={{ 
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    margin:5,
    borderBottomWidth: 1,
    height:25,
    width:25,
    borderColor: "black"}} ></TextInput>
          
        </View>
       

        <Button style={{backgroundColor:'blue',width:250,height:50}}
          title={'Press to Send Notification'}
        
          onPress={() => this.sendPushNotification()}
         // onPress={() => this.sendLocalNotification()} 
        >

                
        </Button>

        <Button style={{backgroundColor:'blue',width:250,height:50}}
          title={'Cancel'}
        
          onPress={() => this.Cancle()}
         // onPress={() => this.sendLocalNotification()} 
        >

                
        </Button>
      </View>
    );
  }
}

