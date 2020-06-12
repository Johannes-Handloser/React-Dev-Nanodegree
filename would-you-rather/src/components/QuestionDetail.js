import React, {Component} from "react"
import { connect } from "react-redux"
import {formatQuestion} from "../utils/helpers";
import Question from "./Question";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class QuestionDetail extends Component {


    render() {

        const {user, question} = this.props;


        if (question === null) {
            return <p> This question doesnt exists </p>
        }

        const { answersFromAuthUser,
            id, optionOneVotes, optionTwoVotes} = question;


        const total = optionOneVotes + optionTwoVotes;
        const percOptionOne = (optionOneVotes / total) * 100;
        const percOptionTwo = (optionTwoVotes / total) * 100;


        return (
            <div>
                <div>
                    <span>Hello, {user.name}</span>
                </div>
                <div className="center">
                    <h3> Question Details </h3>
                </div>
                <Question id={id}/>
                {(answersFromAuthUser !== null && id in answersFromAuthUser) &&
                <h3 className="center">Votes</h3>}
                {(answersFromAuthUser !== null && id in answersFromAuthUser) &&
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Option One</TableCell>
                                <TableCell align="right">Option Two</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key = {id}>
                                <TableCell align="left">{percOptionOne} %</TableCell>
                                <TableCell align="right">{percOptionTwo} %</TableCell>
                            </TableRow>
                            <TableRow key = {user.name}>
                                <TableCell align="left">{optionOneVotes} User</TableCell>
                                <TableCell align="right">{optionTwoVotes} User</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                }
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }, props){
        const {id} = props.match.params;
        let user, question;
        if (authedUser !== null) {
            user = users[authedUser];
        }
        question = questions[id];

    return {
        user,
        question: question ?
        formatQuestion(question, users, authedUser) :
        null,
    }
}

export default connect(mapStateToProps)(QuestionDetail)