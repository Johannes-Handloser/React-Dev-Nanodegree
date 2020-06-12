import { AsyncStorage } from 'react-native';

export const FLASHCARDS_STORAGE_KEY = 'FlashCards:cards';


export const dummyData =
    {
        title: 'React',
        questions: [
            {
                question: 'Is React a Front-End Framework?',
                answer: "Correct"
            },
            {
                question: 'Do you make Ajax requests in React in the componentDidMount lifecycle event?',
                answer: "Correct"
            }
        ]
    };

function setDummyData() {
    return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [dummyData.title]: dummyData}));
}

export function loadInitialDecks( ) {
    return setDummyData()
}