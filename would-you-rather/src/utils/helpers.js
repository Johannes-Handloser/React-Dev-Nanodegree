export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}


export function formatQuestion (question, users, authedUser) {
    const { id, timestamp, optionOne, optionTwo } = question;

    // author name & avatar
    const {name, avatarURL} = users[question.author];

    // object containing answers to list of answered question ids
    const answersFromAuthUser = users[authedUser] ? users[authedUser].answers : null;

    return {
        name,
        id,
        timestamp,
        avatar: avatarURL,
        optionOne: optionOne.text,
        optionOneVotes: optionOne.votes.length,
        optionTwo: optionTwo.text,
        optionTwoVotes: optionTwo.votes.length,
        answersFromAuthUser: answersFromAuthUser
    }
}