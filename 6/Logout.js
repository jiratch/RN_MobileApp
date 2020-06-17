import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native'




export default class Logout extends React.Component {
  
    render() {
        return (
            <View style={styles.container}>
               
                 
                    <Text style={styles.detail}>Logout}</Text>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
       
       
    },
  
    detail: {   
        fontSize: 18
    }
    
})