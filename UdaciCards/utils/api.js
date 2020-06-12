import { AsyncStorage } from 'react-native';
import {FLASHCARDS_STORAGE_KEY} from "./_quiz";

// getDecks: return all of the decks along with their titles, questions, and answers.
export function getAllDecks() {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(decks => Object.values(JSON.parse(decks)))
        .catch(err => console.log(err))
}

// saveDeckTitle: take in a single title argument and add it to the decks.
export function saveDeckTitle(deck) {
    const deckObject = deck
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
        JSON.stringify({ [deck.title]: deck }))
        .then(() => deckObject).catch(err => console.log(err))

}

// addCardToDeck: take in two arguments, title and card,
// and will add the card to the list of questions for the deck
// with the associated title.
export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(d => {
            let decks = JSON.parse(d);
            let deckKeys = Object.keys(decks);

            deckKeys.forEach(deckKey => {
                let deck = decks[deckKey];
                if(deck.title === title){
                    deck.questions = [...deck.questions, card]
                }});
            let updatedDecks = JSON.stringify(decks)
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, updatedDecks).catch(err => console.log(err))
            return Object.values(decks)
        }).catch(err => console.log(err))
}