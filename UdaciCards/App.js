import React, {Component} from 'react';
import Constants from 'expo-constants';
import {View, StatusBar} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import {blue, red, white} from './utils/colors'
import {createAppContainer} from 'react-navigation';
import {FontAwesome} from '@expo/vector-icons'
import DeckDetails from "./components/DeckDetails";
import Quiz from "./components/Quiz";
import AddQuestion from "./components/AddQuestion";
import {setLocalNotification} from "./utils/helpers";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {entries} from "./reducers";

function UdaciStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export const MainNav = createStackNavigator({
    MainPage: {
        screen: createBottomTabNavigator({
                MainPage: {
                    screen: DeckList, navigationOptions: {
                        tabBarLabel: 'Decks',
                        tabBarIcon: () => <FontAwesome name='home' activeTintColor={red} size={20}/>
                    }
                },
                AddDeck: {
                    screen: AddDeck, navigationOptions: {
                        tabBarLabel: 'Add Deck',
                        tabBarIcon: () => <FontAwesome name='plus' Color={red} size={20}/>,
                    }
                },
            },
            {
                tabBarOptions: {
                    activeTintColor: red,
                    inactiveTintColor: 'black',
                    inactiveBackgroundColor: 'rgba(0, 0, 0, 0.1)',
                    labelStyle: {
                        fontSize: 18,
                        paddingBottom: 10,
                    },
                    style: {
                        paddingBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 65,
                        backgroundColor: white,
                    }
                }
            }),
        navigationOptions: {
            header: null
        }
    },
    AddDeck: {
        screen: AddDeck
    },
    DeckDetails: {
        screen: DeckDetails,
    },
    Quiz: {
        screen: Quiz,
    },
    NewCard: {
        screen: AddQuestion,
    }
}, {mode: 'modal'});


const AppContainer = createAppContainer(MainNav);


export default class App extends Component {

    componentDidMount() {
        setLocalNotification()
    }


    render() {
        return (
            <Provider store={createStore(entries)}>
            <View style={{flex: 1}}>
                <UdaciStatusBar backgroundColor={blue} barStyle="light-content"/>
                <AppContainer/>
            </View>
            </Provider>
        )
    }
}

