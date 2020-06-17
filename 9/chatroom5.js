
import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Modal
} from 'react-native';

import moment from 'moment';

import * as firebase from 'firebase';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBmz4eFhvaBX6weQdJuY8NOxv-Vn0Ojnj0",
  authDomain: "newanimebeltt.firebaseapp.com",
  databaseURL: "https://newanimebeltt.firebaseio.com",
  projectId: "newanimebeltt",
  storageBucket: "",
  messagingSenderId: "712845941423",
  appId: "1:712845941423:web:e4b0db957969af5bc5925a"

};
//firebase.initializeApp(config);

console.ignoredYellowBox = [
  'Setting a timer'
]

export default class Appl9 extends React.Component {
  constructor(props){
    super(props);
    this.database = firebase.database();
    this.state = {
      chat: '',
      chats: [],
      modalVisible: true,
      name: "Anonymous",
      isShowLogin: true,
      email: "",
      password: ""
    };
    this.chatsRef = this.database.ref('chats');
    this.sendChat = this.sendChat.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.listenForAuthChange = this.listenForAuthChange.bind(this);
  }

  listeningForChatChange() {
    this.chatsRef.on('value', (snapshot) => {
      let tmp = snapshot.val();
      if(!tmp[0]){
        console.log("chats is empty")
      }
      else {
        this.setState({
          chats: snapshot.val()
        });
      }
    });
  }

  componentDidMount() {
    this.listeningForChatChange();
    this.listenForAuthChange();
  }

  sendChat() {
    console.log(this.state.chat);
    /*
      pass .transaction a function that modifies the "chats" array in the DB
      the input argument to the function is the array that's on the DB now
      we can modify it however we like, then return the modified array
    */
    this.chatsRef.transaction((chats) => {
      if (!chats[0]) { // if the first element of "chats" is false, i.e., the array is "empty"
        chats = [];
      }
      chats.push({
        name: this.state.name,
        chat: this.state.chat,
        when: new Date().getTime()
      });
      this.setState({chat:""});
      return chats;
    });
  }

  register() {
    console.log(this.state.email, this.state.password);
    firebase.auth().createUserWithEmailAndPassword(this.state.email,
      this.state.password).then((user) => {
        this.setState({isShowLogin: true, modalVisible: false});
        console.log("Created user successfully");
    }).catch((error) => {
      alert("An error occured: " + error.message);
      console.log('An error occured', error.message);
    });
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, 
      this.state.password).then((user) => {
        console.log("Login user successfully");
        console.log(user);
        this.setState({modalVisible: false});
      }).catch((error) => {
        alert("An error occured: " + error.message);
        console.log('An error occured', error.message);
    });
  }

  // for lab: add logout function


  listenForAuthChange() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("auth changed");
      if (user) {
        console.log('User details', user);
        this.setState({name: user.email})
      } 
      else {
        console.log("no one is signed in ");
        this.setState({
          name: 'Anonymous',
          modalVisible: true
        });
      }
    });
  }

  render() {

    let authUI;

    if(this.state.isShowLogin) {
      authUI = (
        <View>
          <Text style={styles.title}>Login</Text>
          <Text>E-mail</Text>
          <TextInput keyboardType="email-address" autoCapitalize="none"
            style={styles.textInput} value={this.state.email}
            onChangeText={(t) => this.setState({email: t})}></TextInput>
          <Text>Password</Text>
          <TextInput secureTextEntry={true} style={styles.textInput}
            value={this.state.password}
            onChangeText={(t) => this.setState({password: t})}></TextInput>
          <TouchableOpacity style={styles.submitButton} onPress={this.login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondButton}
            onPress={() => this.setState({isShowLogin: false})}>
            <Text style={styles.secondButtonText}>Don't have an account?</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      authUI = (
        <View>
          <Text style={styles.title}>Register</Text>
          <Text>E-mail</Text>
          <TextInput keyboardType="email-address" autoCapitalize="none"
            style={styles.textInput} value={this.state.email}
            onChangeText={(t) => this.setState({email: t})}></TextInput>
          <Text>Password</Text>
          <TextInput secureTextEntry={true} style={styles.textInput}
            value={this.state.password}
            onChangeText={(t) => this.setState({password: t})}></TextInput>
          <TouchableOpacity style={styles.submitButton} onPress={this.register}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondButton}
            onPress={() => this.setState({isShowLogin: true})}>
            <Text style={styles.secondButtonText}>Already have account?</Text>
          </TouchableOpacity>
        </View>
      )
    }

    // for lab: add header that shows current logged in user, and a button to logout
    return (
      <View style={styles.container}>
        <Modal animationType={"slide"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={()=>{}}>
          <View style={styles.modal}>
            {authUI}
          </View>
        </Modal>
        <View style={styles.content}>
          {this.state.chats.map((obj, i) => {
              return(
                <View key={i} style={styles.container}>
                  <View style={styles.chatMeta}>
                    <Text style={styles.bold}>{obj.name || "Anonymous"}</Text>
                    <Text> ({moment(obj.when).fromNow()}) </Text>
                  </View>
                  <View style={styles.chat}>
                    <Text style={styles.chatText}>{obj.chat}</Text>
                  </View>
                </View>
              );
            })}
        </View>
        <View style={styles.footer}>
          <TextInput style={styles.textInput}
            value={this.state.chat}
            onChangeText={(t) => this.setState({chat:t})}>
          </TextInput>
          <TouchableOpacity style={styles.button}
            onPress={this.sendChat}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  content:{
    padding: 10,
    flex:1,
  },
  footer:{
    height: 50,
    backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    height: 50,
    width: 200,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5
  },
  button:{
    width: 100,
    backgroundColor: 'darkblue',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 20,
    color: 'white'
  },
  modal: {
    height: 280,
    width: 300,
    marginTop: 150,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: 'darkblue',
    width: 100,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  chatMeta: {
    flexDirection: 'row'
  },
  chat: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 5
  },
  chatText: {
    color: 'white'
  },
  bold: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});
