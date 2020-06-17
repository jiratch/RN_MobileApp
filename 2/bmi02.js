import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class makingBMI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weight: '0',
            height: '0',
            bmi: 0
        };
    }

    compute() {
      console.log('On pressed!')
    }

    render() {
        console.log(this.state);
        return (
        <View style={styles.container}>
            <View style={styles.group}>
                <Text style={styles.title}>Weight (KG) </Text>
                <TextInput style={styles.input}
                keyboardType='numeric'
                value={this.state.weight}
                onChangeText={(weight) => this.setState({weight})}/>
            </View>
            <View style={styles.group}>
                <Text style={styles.title}>Height (CM) </Text>
                <TextInput style={styles.input}
                keyboardType='numeric'
                value={this.state.height}
                onChangeText={(height) => this.setState({height})}/>
            </View>
            <View style={styles.center}>
                <View style={styles.group}>
                    <Text style={styles.title}>BMI: 0.00 </Text>
                </View>
                <View style={styles.group}>
                    <TouchableOpacity style={styles.button}
                        onPress={this.compute}>
                        <Text style={styles.buttonText}>Compute</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    flexDirection:'column',
    padding: 20
  },
  group: {
  	marginTop: 20
  },
  button: {
  	backgroundColor: 'lightblue',
  	padding: 20,
  	borderWidth: 1
  },
  buttonText: {
  	fontSize: 20
  },
  input: {
  	padding: 10,
  	height: 40,
  	borderWidth: 1
  },
  title: {
  	fontSize: 20
  },
  center: {
  	alignItems: 'center'
  }
});


