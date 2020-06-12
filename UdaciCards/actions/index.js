export const GET_DECKS = "GET_DECKS";
export const GET_DECK = "GET_DECK";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_DECK = "ADD_DECK";

export function getDeck(title) {
    return {
        type: GET_DECK,
        title
    }
}

export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addNewDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addNewCard(decks, title) {
    return {
        type: ADD_QUESTION,
        decks,
        title
    }
}