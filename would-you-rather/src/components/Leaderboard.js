import React, {Component} from "react"
import { connect } from "react-redux"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



class Leaderboard extends Component {

    render() {

        const {user, users} = this.props;


        return (
            <div>
                <div>
                    <span>Hello, {user.name}</span>
                </div>
                <div className="center">
                    <h3> Leaderboard </h3>
                    <Paper >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell align="right">Picture</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Questions asked</TableCell>
                                    <TableCell align="right">Questions answered</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key = {user.id}>
                                        <TableCell component="th" scope="row">
                                            <span className="rank">{ index +1 }</span>
                                        </TableCell>
                                        <TableCell align="right">
                                            <img src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`}/>
                                        </TableCell>
                                        <TableCell align="right">{user.name}</TableCell>
                                        <TableCell align="right">{user.questions.length}</TableCell>
                                        <TableCell align="right">{Object.keys(user.answers).length}</TableCell>
                                    </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        )
    }
}



function mapStateToProps({authedUser, users}) {
    let user;

    if (authedUser !== null) {
        user = users[authedUser];
    }

    const score = (user) =>
        Object.keys(user.answers).length + user.questions.length;

    return {
        user,
        users: Object.values(users).sort((a, b) => score(b) - score(a))
    }
}

export default connect(mapStateToProps)(Leaderboard)
