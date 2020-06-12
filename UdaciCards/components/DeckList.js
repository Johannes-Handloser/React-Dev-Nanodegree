import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import {deleteAllDecks, loadDecks} from "../utils/helpers";
import {blue, white} from "../utils/colors";

class DeckList extends Component {

    componentDidMount() {
        //deleteAllDecks();
        loadDecks(this.props.dispatch);
    }


    render() {
        const { decks } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {decks.map(singleDeck => {
                        return (
                            <View key={singleDeck.title} style={styles.deck}>
                                <View style={styles.row}>
                                    <Text style={{fontSize:22,fontWeight:'bold'}}> {singleDeck.title} </Text>
                                    <Text style={{fontSize:20, paddingBottom:5}}> {singleDeck.questions.length === 0 ? "No Questions" : singleDeck.questions.length + " Questions"} </Text>
                                    <TouchableOpacity
                                        style={styles.detailsBtn}
                                        onPress={() => this.props.navigation.navigate('DeckDetails', {deck:singleDeck})}
                                    >
                                        <Text style={{textAlign: "center"}}>Open Deck</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )})}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    deck: {
        flex:1,
        margin:10,
        borderRadius:5,
        alignItems:'center'
    },
    row: {
        flex: 1,
        backgroundColor: white,
        padding:15,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 10
    },
    detailsBtn: {
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


function mapStateToProps (state) {
    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(DeckList)
