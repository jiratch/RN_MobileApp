import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';

import TodoList from './TodoList'

let firebaseConfig = {
    apiKey: "AIzaSyBmz4eFhvaBX6weQdJuY8NOxv-Vn0Ojnj0",
    authDomain: "newanimebeltt.firebaseapp.com",
    databaseURL: "https://newanimebeltt.firebaseio.com",
    projectId: "newanimebeltt",
    storageBucket: "",
    messagingSenderId: "712845941423",
    appId: "1:712845941423:web:e4b0db957969af5bc5925a"

  // เปลี่ยน config ด้วยนะ
};
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})