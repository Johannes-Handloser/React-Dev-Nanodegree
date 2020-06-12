import {getInitialData, saveQuestion, saveQuestionAnswer} from "../utils/api";
import {addUserAnswer, addUserQuestion, receiveUsers} from "./users";
import {addQuestion, receiveQuestions} from "./questions";
import {addAnswer} from "./questions"

import {showLoading, hideLoading} from "react-redux-loading"


// redux thunk pattern
// needs middleware
export function handleInitialData ( ) {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading())
            } )
    }
}


export function handleAddAnswer (info) {
    return (dispatch) => {
        saveQuestionAnswer(info)
            .then(() => {
                dispatch(addAnswer(info));
                dispatch(addUserAnswer(info))
            })
    }
}

export function handleAddQuestion (question) {
    return dispatch => {
        saveQuestion(question).then(
            (question) => {
                dispatch(addQuestion(question));
                dispatch(addUserQuestion(question));
        })
    }
}