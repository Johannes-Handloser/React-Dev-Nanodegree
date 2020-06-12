import * as Permissions from 'expo-permissions'
import {addCardToDeck, getAllDecks, saveDeckTitle} from "./api";
import {addNewCard, getDeck, getDecks, addNewDeck} from "../actions";
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'


const NOTIFICATION_KEY = 'MobileFlashCard:notifications';


export function clearLocalNotifications () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}


export function createNotification () {
    return {
        title: 'Take a quiz!',
        body: "Complete a quiz today!"
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(19)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}

export function loadDecks (dispatch) {
    getAllDecks()
        .then((decks) => {
            dispatch(getDecks(decks))
        })

}

export function loadDeck (title, dispatch) {
    getAllDecks()
        .then((decks) => {
            const deck = decks.find(x => x.title === title);
            dispatch(getDeck(deck))
        })
}

export function addNewQuestion (title, card, dispatch) {
    addCardToDeck(title, card)
        .then((decks) => {
            dispatch(addNewCard(decks, title))
        })
}

export function addDeck(title, dispatch) {
    saveDeckTitle(title)
        .then((deck) => {
            dispatch(addNewDeck(deck))
        })
}

export function deleteAllDecks () {
    return AsyncStorage.clear()
}