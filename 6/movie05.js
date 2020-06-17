import React from 'react';
import { 
  Button, View, Text, TouchableHighlight, StyleSheet, FlatList, Image,TextInput, TouchableOpacity ,ImageBackground,SafeAreaView,ScrollView,Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements'
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Toast, {DURATION} from 'react-native-easy-toast'
import API from './api.js';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook'
import bg from './bg.jpg'
import TodoList from './TodoList'


var NUM_MOVIES = 10; // number of movies to display on the list screen

var config = {
  apiKey: "AIzaSyBmz4eFhvaBX6weQdJuY8NOxv-Vn0Ojnj0",
  authDomain: "newanimebeltt.firebaseapp.com",
  databaseURL: "https://newanimebeltt.firebaseio.com",
  projectId: "newanimebeltt",
  storageBucket: "",
  messagingSenderId: "712845941423",
  appId: "1:712845941423:web:e4b0db957969af5bc5925a"
  };

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.database = firebase.database();
    this.state = {
      email:"",
      name: "",
      password: "",
      login_Facebook: false
    };


    this.login = this.login.bind(this);
    this.listeningForAuthChange = this.listeningForAuthChange.bind(this);
  

  }

  componentDidMount(){

     firebase.auth().onAuthStateChanged((user)=>{
       if(user!=null){
        // console.log(user)
         
       }
     })
  }
static navigationOptions = {
    header: null,
  };

  listeningForAuthChange() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('auth', user);
      if (user) {
        this.setState({name: user.email});
      } else {
        this.setState({name: 'Anonymous'});
      }
    });
  }

  login() {
    console.log(this.state.email, this.state.password);
    firebase.auth().signInWithEmailAndPassword(this.state.email,
      this.state.password).then((user) => {
        this.props.navigation.navigate('Home');
        console.log(`${user} Login successfully`);
      }).catch((err) => {
        alert("An error occured: " + err.message);
        console.log('An error occurred', err);
      });
  }
  
  async loginWithFacebook(){
 
    const {type,token} =  await Facebook.logInWithReadPermissionsAsync('817379605351139',{ permissions:['public_profile'] })
    console.log(`Facebook Login successfully 1`);
  
    if(type == 'success'){
      console.log(`Facebook Login successfully 2`);
     this.setState({ login_Facebook:true})
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      
      firebase.auth().signInWithCredential(credential).catch((error)=>{
        console.log(error)
      });
      
    }
  }


  
  render() {

    return (
      <ImageBackground source={bg} style={styles.bgcontainer}>
        <View style={styles.logoContainer}>
          <Text style={{color:'white',fontSize:30,fontWeight:'bold',}}>Movie Review </Text>
          <View style={styles.inputContainer}>
     
            <TextInput
               style={styles.input}
               placeholder={'Email'}
               onChangeText={(t) => this.setState({email: t})}
            />
             <TextInput
               style={styles.input}
               secureTextEntry={true}
               placeholder={'Password'}
               onChangeText={(t) => this.setState({password: t})}

            />
            
          </View>
          <TouchableOpacity style={styles.login} onPress={this.login}>
          <Text style={styles.text}> Log in </Text>
          
          </TouchableOpacity>

          <TouchableOpacity style={styles.login} onPress={()=>{this.loginWithFacebook().then(()=>{ 
            if(this.state.login_Facebook){
            this.props.navigation.navigate('Home');}})}}>

          <Text style={styles.text}> Log in with facebook </Text>
          
          </TouchableOpacity>

          <TouchableOpacity style={styles.signup}
                  onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}>
          <Text style={styles.text}> Sign up </Text>
          
          </TouchableOpacity>
        </View>

        

      </ImageBackground>
    );
  }
}


class  Signup extends React.Component {
  constructor(props) {
    super(props);
    this.database = firebase.database();
    this.state = {
      email:"",
      name: "",
      password: "",
      forgetPass: false
    };

    this.register = this.register.bind(this);
 
    this.listeningForAuthChange = this.listeningForAuthChange.bind(this);
 

  }
  static navigationOptions = {
    title: null,
  };
  listeningForAuthChange() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('auth', user);
      if (user) {
        this.setState({name: user.email});
      } else {
        this.setState({name: 'Anonymous'});
      }
    });
  }


  register() {
    console.log(this.state.email, this.state.password);
    firebase.auth().createUserWithEmailAndPassword(this.state.email,
      this.state.password).then((user) => {
        this.props.navigation.navigate('Login');
        console.log('Create user successfully');
      }).catch((err) => {
        alert('An error occurred: ' + err.description);
        console.log('An error occurred', err);
      });
  }

 

  render() {

    return (
      <ImageBackground source={bg} style={styles.bgcontainer}>
        <View style={styles.logoContainer}>
          <Text style={{color:'white',fontSize:35,fontWeight:'bold',}}>Sign up</Text>
          <View style={styles.inputContainer}>
     
            <TextInput
               style={styles.input}
               placeholder={'Email'}
               onChangeText={(t) => this.setState({email: t})}
            />
             <TextInput
               style={styles.input}
               secureTextEntry={true}
               placeholder={'Password'}
               onChangeText={(t) => this.setState({password: t})}

            />
            
          </View>

          <TouchableOpacity style={styles.signup} onPress={this.register}>
          <Text style={styles.text}> Sign up </Text>
          
          </TouchableOpacity>
        </View>

        

      </ImageBackground>
    );
  }
}


class ListScreen extends React.Component {

  constructor() {
    super();
   
    this.loadMovie = this.loadMovie.bind(this);
    this.state = {
      listData : Array(5).fill(null),text:''
    };
   
  }


  loadMovie(title){
    API(title).then((data) => {
      let movies = data.results // array of movies
      if(!movies[0]){  this.refs.toast.show('Not Found!', 5000, () => {
        // something you want to do at close
    });
     // console.log(movies[0])
    }
      movies = movies.slice(0,NUM_MOVIES); // Take only the first NUM_MOVIES movies
      const listData = this.state.listData.slice()
      for (let i = 0; i < NUM_MOVIES; i++)
        listData[i] = movies[i];
      this.setState({
        listData : listData
      });
    });
  }


  static navigationOptions = {
    title: 'Movie Explorer',
  };

  render() {
    let pic = {uri: 'https://image.tmdb.org/t/p/w200/jIjdFXKUNtdf1bwqMrhearpyjMj.jpg'};
    const listData  = this.state.listData.slice();
    // show this at when the app first loads
    let dataToShow = [
     
    ];
    // api call successful, listData is not null array
    if (listData[0]){
      dataToShow = [];
    

     // console.log("found")
      for (let k = 0; k < NUM_MOVIES; k++){
        let imgURI = 'https://image.tmdb.org/t/p/w200/';
        imgURI += listData[k].poster_path;
        new_obj = {
          key: listData[k].title, 
          imgSource: {uri: imgURI},
          vote_average: listData[k].vote_average,
          overview: listData[k].overview,
          release_date: listData[k].release_date
        };
        dataToShow.push(new_obj);
      }
    }
    else if(!listData[0]){
     // console.log("Not found")
     // this.refs.toast.show('hello world!', DURATION.FOREVER);
    
    }
    

    return (
      <View style={{padding: 20}}>
     
        <View style={{flexDirection:'row'}}>
       <TextInput
          style={{height: 40, borderWidth: 1,flex:0.85}}
          placeholder="Type here to search..."
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}

        />
     <TouchableOpacity style={{flex:0.15}} onPress={()=>{ 
       this.loadMovie(this.state.text) 
       this.setState({text:''})}} >
          <View style={styles.button}>
          <Icon style={styles.buttonText} name='search' color='white' />
        
            
           
          </View>
        </TouchableOpacity>
       
        </View>
        
        <FlatList
          data = {dataToShow}
          renderItem = { ({item}) => {
              return(
                <TouchableHighlight onPress={() => {
                  this.props.navigation.navigate('Details', {
                    movieName: item.key,
                    poster: item.imgSource,
                    vote_average: item.vote_average,
                    overview: item.overview,
                    release_date: item.release_date
                  });
                }}>
                  <View style={styles.row}>
                    <Image style={styles.image1} source={item.imgSource}/>
                    <Text style={styles.title}>
                        {item.key}
                    </Text>
                    
                  </View>
                </TouchableHighlight>
              );
            }
          }
        />
          
          <Toast ref="toast"/>
      </View>
    );
  }
}


class DetailsScreen extends React.Component {
  constructor() {
    super();
   
   
    this.state = {
      comments:''
    };
   
  }

  static navigationOptions = {
    title: 'Movie Details',
  };

  render() {
    const { params } = this.props.navigation.state;
    const movieName = params ? params.movieName : null;
    const poster = params ? params.poster : null;
    const vote_average = params ? params.vote_average : null;
    const overview = params ? params.overview : null;
    const release_date = params ? params.release_date : null;

    /* console.log(poster);
    console.log(vote_average);
    console.log(overview);
    console.log(release_date); */

    return (
      <View style={{flex:1}}>
      <View style={{flex:0.4,padding: 10, flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <Image style={styles.image2} source={poster}/>
          <Text> Rating: {vote_average} </Text>
        </View>
        <View style={{flex:3, padding:10}}>
          <Text style={{fontSize: 20}}> {movieName} </Text>
          <View style={{height:1, backgroundColor:'lightgray', margin:5}}/>
          <Text> Released on: {release_date} </Text>
         
     
        </View>  
        
      </View>
      <View style={{flex:0.6,justifyContent:'center'}}>
      
      <TodoList moviename={movieName } />
      </View>
     
    
     
    </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: ListScreen,
    Details: DetailsScreen,
    Login:Login,
    Signup:Signup
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'darkblue',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class AppC extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  bgcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: null,
    height: null

  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
 inputContainer:{
  marginTop:80

 },
 text:{
   color:"white",
   fontSize:16,
   textAlign:'center'

 },
 login:{
  width: 250,
  height:45,
  fontSize:16,
  borderRadius:25,
  backgroundColor:'rgba(0,0,153,0.55)',
  justifyContent:'center',
  marginTop:20

 },
 signup:{
  width: 250,
  height:45,
  fontSize:16,
  borderRadius:25,
  backgroundColor:'rgba(204,0,0,0.55)',
  justifyContent:'center',
  marginTop:15

 },

 inputicon:{
 position:'absolute',
 top:10,
 left:37
 },
 input:{
   width: 250,
   height:45,
   fontSize:16,
   borderRadius:25,
   paddingLeft:45,
   backgroundColor:'rgba(255,255,255,0.5)',
   marginTop: 4,
 },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20
  },
  row : {
    flexDirection: 'row',
    height: 100,
    flex: 1
  },
  image1: {
    height: 100,
    flex: 2
  },
  image2: {
    height: 30,
    flex: 1
  },
  title: {
    fontSize: 20,
    flex: 5,
    padding: 20,
    borderWidth: 1
  },
  button: {
    height:40,
    width: 40,
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection:'row'
  },
  buttonText: {
    textAlign: 'center',
    padding:50,
    color: 'white'
  }
});