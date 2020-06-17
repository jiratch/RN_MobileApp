import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import firebase from 'firebase'

import ListDetail from './ListDetail'
import AddList from './AddList'

export default class TodoList extends React.Component {
    state = { lists: [] };

    componentWillMount() {
        firebase.database().ref('todo/').on('value', (snap) => {
            this.setState({ lists: snap.val() })

        })
      //  console.log(this.props.moviename)
    }

    renderLists() {
        let lists = [];

        if(this.state.lists) {
            Object.keys(this.state.lists).map((key, index) => {
               if(this.state.lists[key].moviename ==this.props.moviename)
                {lists.push(<ListDetail key={key} index={index} data={this.state.lists[key].detail} firebaseKey={key} />)}
            })

            return lists
        }

        
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <AddList moviename={this.props.moviename} />
                {this.renderLists()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
    },

})