import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Dimensions, TextInput, Alert } from 'react-native'
import * as firebase from 'firebase';

let width = Dimensions.get('window').width;

export default class ListDetail extends React.Component {
    state = {
        input: ''
    }
 componentDidMount(){
     console.log('addlist',this.props.moviename)
 }
    addList = () => {
        if (this.state.input != '') {
            firebase.database().ref('todo/').push({
                detail: this.state.input,
                moviename:this.props.moviename
            });
            this.setState({ input: '' })
        } else {
            Alert.alert('Please write some detail !')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ input: text })}
                    placeholder='Leave comments...'
                    value={this.state.input}
                />
                <TouchableHighlight
                    style={styles.add_btn}
                    onPress={() => this.addList()}
                >
                    <Text style={styles.add}>+</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingRight: 10,
        paddingLeft: 10,
    
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        width: 225,
        padding: 12,
        fontSize: 15,
    },
    listContainer: {
        flexDirection: 'row',
    },
    add_btn: {
        backgroundColor: 'blue',
       
        alignSelf: 'center',
        paddingHorizontal: 18,
        paddingVertical: 2
    },
    add: {
        fontSize: 30,
        color: '#FFF',
    }
})