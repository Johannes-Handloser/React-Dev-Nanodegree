import React, {Component} from "react"
import {connect} from "react-redux"
import {formatDate, formatQuestion} from "../utils/helpers";
import {handleAddAnswer} from "../actions/shared";
import {MdAnnouncement} from "react-icons/md";
import {Link} from "react-router-dom";

class Question extends Component {


    OPTION_ONE = "optionOne";
    OPTION_TWO = "optionTwo";


    render() {

        const {question} = this.props;

        if (question === null) {
            return <p> This question doesnt exists </p>
        }

        const {optionOne, optionTwo, avatar, name, timestamp, answersFromAuthUser, id} = question;

        let pollSelection = [];
        if (answersFromAuthUser !== null && id in answersFromAuthUser) {
            if (answersFromAuthUser[id] === this.OPTION_ONE) {
                pollSelection = ["poll poll-one selected", "poll poll-two"]
            } else if (answersFromAuthUser[id] === this.OPTION_TWO) {
                pollSelection = ["poll poll-one", "poll poll-two selected"]
            }
        } else {
            pollSelection = ["poll poll-one", "poll poll-two"]
        }

        return (
            <div className="question">
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className="avatar"
                />
                <div className="question-info">
                    <div>
                        <span>{name}</span>
                        <div>
                            {formatDate(timestamp)}
                        </div>
                        <div className="polls">
                            <div className={pollSelection[0]}
                                 onClick={() => this.handleVote(this.OPTION_ONE)}>{optionOne}</div>
                            <div className={pollSelection[1]}
                                 onClick={() => this.handleVote(this.OPTION_TWO)}>{optionTwo}</div>
                        </div>
                    </div>
                    <div className="question-icons">
                        <Link to={`/questions/${id}`}>
                            <MdAnnouncement className="question-icon" size={30}/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    handleVote = (voteAnswer) => {
        const {dispatch, question, authedUser} = this.props;

        if (question.answersFromAuthUser !== null && !(question.id in question.answersFromAuthUser)) {
            if (voteAnswer === this.OPTION_ONE) {
                dispatch(handleAddAnswer({
                    authedUser,
                    qid: question.id,
                    answer: this.OPTION_ONE
                }))
            } else {
                dispatch(handleAddAnswer({
                        authedUser,
                        qid: question.id,
                        answer: this.OPTION_TWO
                    }
                ))
            }
        }
    }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
    const question = questions[id];

    return {
        authedUser,
        question: question ?
            formatQuestion(question, users, authedUser) :
            null
    }
}

export default connect(mapStateToProps)(Question)