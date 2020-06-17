
import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Modal
} from 'react-native';


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
  //firebase.initializeApp(config);

  export default class AppLab10 extends React.Component {
    constructor(props){
        super(props);
        this.database = firebase.database();
        this.state = {
          item: '',
          items: ['1'],
          showtext:''
        
        };
        this.productRef = this.database.ref('products');
        this.SeachPrice = this.SeachPrice.bind(this);
    
    }
    componentDidMount() {
    

    } 

    SeachPrice(itemname){
        this.productRef.on('value', (snapshot) => {
            let tmp = snapshot.val();
            let foundItem =[]
            if(!tmp[0]){
              console.log(item)
              console.log("No items found")
            }
            else {
             

              
               foundItem = snapshot.val().filter((item)=>item.name === itemname)
               if(!foundItem[0]){console.log("not found")
               
             
                this.setState({
                showtext: 'No Item Found'
              });}
              else{
                this.setState({
                  items: foundItem
                });
                this.setState({
                  showtext:`Price = ${this.state.items[0].price} Baht`
                });
              }
            

          }
          });

    } 

  
    render() {
      return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',marginTop:70}}>
           <TextInput style={styles.textInput}
            value={this.state.chat}
            onChangeText={(t) => this.setState({item:t})}>
          </TextInput>
          <TouchableOpacity style={styles.button}
            onPress={()=>this.SeachPrice(this.state.item)}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          </View>

          <View style={{marginTop:30}}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>{this.state.showtext}</Text>
          </View>

     
    

        </View>
      );
    }
    
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    textInput: {
        flex: 1,
        height: 50,
        width: 200,
        padding: 10,
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
        fontSize: 15,
        color: 'white'
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
  });