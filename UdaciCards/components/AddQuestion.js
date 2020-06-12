import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import {blue, white} from "../utils/colors";
import {addNewQuestion} from "../utils/helpers";
import {connect} from 'react-redux'

class AddQuestion extends Component {

    static navigationOptions = () => {
        return {
            title: 'Add a Question'
        }
    };

    state = {
        question: "",
        answer:  "",
    };


    render(){
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 10 }}>
                    <TextInput
                        onChangeText={(question) => this.setState({question})}
                        placeholder="Enter a Question">
                    </TextInput>

                </View>
                <View style={{ marginBottom: 10 }}>
                    <TextInput
                        onChangeText={(answer) => this.setState({answer})}
                        placeholder="Enter 'Incorrect' or 'Correct' as an Answer">
                    </TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.addQuestion}>
                        <Text style={{textAlign: "center"}}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    addQuestion = () => {
        if(this.state.question === "" || this.state.answer === ""){
            alert("Please add question and answer")
        } else {
            const deck = this.props.navigation.state.params.title
            addNewQuestion(deck, this.state, this.props.dispatch)
            this.props.navigation.navigate('DeckDetails', {deck:deck})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    submitBtn: {
        borderWidth: 2,
        borderColor: blue,
        padding: 5,
        width:130,
        borderRadius: 50,
        height: 30,
        marginLeft: 40,
        marginRight: 40,
    }
});


// function mapStateToProps (state) {
//     return {
//         decks: state.decks
//     }
// }

export default connect(null)(AddQuestion)