import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import {clearLocalNotifications, loadDeck, setLocalNotification} from "../utils/helpers";
import {connect} from 'react-redux'
import {blue, white} from "../utils/colors";

class DeckDetails extends Component {

    componentDidMount() {
        loadDeck(this.props.navigation.state.params.deck.title, this.props.dispatch)
    }

    startQuiz = (questions) => {
        if( questions.length < 1){
            alert("This Deck has no questions.")
        } else {
            clearLocalNotifications()
                .then(setLocalNotification);
            this.props.navigation.navigate('Quiz', questions)
        }
    };

    render() {
        const { deck } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={{fontSize:22,fontWeight:'bold', textAlign:"center"}}> {deck.title} </Text>
                    <Text style={{fontSize:20, paddingBottom:5, textAlign:"center"}}>
                        {deck.questions.length === 0 ? "No Questions" : deck.questions.length + " Questions"}
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('NewCard', deck)}
                        style={styles.btn}
                    >
                        <Text style={{textAlign: 'center',  fontSize: 18}} >Add Question</Text>
                    </TouchableOpacity>
                    {deck.questions.length === 0 ? null :
                        <TouchableOpacity style={styles.btn} onPress={() => this.startQuiz(deck.questions)}>
                            <Text style={{textAlign: 'center', fontSize: 18}} >Start Quiz</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom:0,
        backgroundColor: white
    },
    btn: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor:blue,
        padding: 5,
        width:130,
        borderRadius: 50,
        height: 35,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'center',
        alignItems:'center',
        alignSelf:'center',
    },
    row: {
        flex: 1,
        backgroundColor:white,
        padding:15,
        paddingBottom:0,
        alignSelf: 'stretch',
        alignItems: 'center',
    }
});

function mapStateToProps(state) {
    return {
        decks: state.decks,
        deck: state.deck
    }
}


export default connect(mapStateToProps)(DeckDetails)