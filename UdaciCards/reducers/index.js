import {ADD_DECK, ADD_QUESTION, GET_DECK, GET_DECKS} from '../actions'
import {dummyData, loadInitialDecks} from "../utils/_quiz";


const initialState = {
    decks: [],
    deck: {
        title: '',
        questions: []
    }
};

export function entries(state = initialState, action) {
    switch (action.type) {
        case GET_DECKS:
            let decks = undefined;
            if (action.decks === undefined) {
                loadInitialDecks();
                decks = [dummyData]
            }
            else if(action.decks.length > 0) {
                decks = action.decks
            }
            return{
                decks: decks,
                deck: state.deck
            };
        case GET_DECK:
            return {
                decks: state.decks,
                deck: action.title
            };
        case ADD_QUESTION:
            const updatedDeck = action.decks.find(x => x.title === action.title);
            return {
                decks: action.decks,
                deck: updatedDeck
            };
        case ADD_DECK:
            let newDeck = {...action.deck};
            return {
                decks: [...state.decks, newDeck],
                deck: newDeck
            };
        default:
            return state
    }
}

export default entries