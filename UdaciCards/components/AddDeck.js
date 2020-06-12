import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native"
import {blue} from "../utils/colors";
import {addDeck} from "../utils/helpers";
import {connect} from "react-redux";

class AddDeck extends Component {

    state = {
        deck: {
            title: "",
            questions: []
        }
    };

    render(){
        return (
            <View style={styles.center}>
                <View>
                    <TextInput onChangeText={this.getTitle}
                               placeholder="Enter a name for your new Deck!">
                    </TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.addDeck}>
                        <Text style={{textAlign: "center"}}>Create Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>

            )
    }

    getTitle = (input) => {
        let deck = {...this.state.deck};
        deck.title = input;
        this.setState(() => ({ deck }))
    };

    addDeck = () => {
        if(!this.state.title){
            alert("Please add deck title")
        } else {
            const newDeck = {...this.state.deck};
            addDeck(newDeck, this.props.dispatch);
            this.resetState();
            this.props.navigation.navigate('DeckDetails', {deck: newDeck})
        }
    };

    resetState = () => {
        let reset = {...this.state.deck};
        reset.title = "";
        this.setState(() => ({deck: reset}));
    }
}

const styles = StyleSheet.create({
        center: {
        flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 30,
            marginRight: 30,
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


export default connect(null)(AddDeck)