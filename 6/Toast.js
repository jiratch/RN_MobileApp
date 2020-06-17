import React from 'react';

import Toast, {DURATION} from 'react-native-easy-toast'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default class AppToast extends React.Component  {
render() {
    var a=1
    Test = ()=>{
        if(a>0)
        this.refs.toast.show('hello world!');
    }
    Test()
       return (
           <View >
               <TouchableHighlight
                   style={{padding: 10}}
                   onPress={()=>{
                       this.refs.toast.show('hello world!');
                   }}>
                   <Text>Press me</Text>
               </TouchableHighlight>
               <Toast ref="toast"/>
           </View>
       )
   }
}
