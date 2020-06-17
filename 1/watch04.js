
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

export default class Watch4 extends Component {

  constructor(props){
    super(props);
    this.state = {
      timeEapsed: null, // difference between current time and start time
      running: false, // is the timer running?
      startTime: null, // record the start time when user clicks start
      laps: [] // store the lap records
    };
    this.handleStartPress = this.handleStartPress.bind(this);
  }
  
  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({
        running: false
      });
      return;
    }
  
    this.setState({
      startTime: new Date()
    });
  
    // setInterval runs its callback every n milliseconds
    this.interval = setInterval(() => {
      this.setState({
        timeEapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  }
  

  startStopButton() {
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight underlayColor="gray"
      onPress={this.handleStartPress} style={[styles.button, style]}>
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeEapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.startStopButton()}
            <TouchableHighlight 
              style={styles.button}
              underlayColor='gray'
              onPress={this.handleLapPress}>
              <Text>Lap</Text>
            </TouchableHighlight>
          </View>
        </View>
  
        <View style={styles.footer}>
          <View style={styles.lap}>
            <Text style={styles.lapText}>Lap #2</Text>
            <Text style={styles.lapText}>00:00.00</Text>
          </View>
          <View style={styles.lap}>
            <Text style={styles.lapText}>Lap #1</Text>
            <Text style={styles.lapText}>00:00.00</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  lapText: {
    fontSize: 30
  },
  startButton: {
    borderColor: 'green'
  },
  stopButton: {
    borderColor: 'red'
  }
});



