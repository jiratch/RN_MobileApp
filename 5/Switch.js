// minimum working example for Switch
import React, { Component } from 'react';
import {
  Platform,StyleSheet,Text,View,Switch
} from 'react-native';

export default class AppSwitch extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      switch : false
    }
  }

  render() {
    let message
    if (this.state.switch) {
      message = 'Weekly';
    }
    else {
      message = 'Daily';
    }
    return (
      <View style={styles.container}>
        <Text style={{fontSize:25,margin:10}}>{message}</Text>
        <Switch onValueChange={() => {
          this.setState({
            switch : !this.state.switch
          })
          this.props.onPress(this.props.code, this.props.name,this.state.switch)
        }}

        value={this.state.switch}/>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  }
});
