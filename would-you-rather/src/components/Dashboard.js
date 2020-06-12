import React, {Component} from "react"
import {connect} from "react-redux"
import Question from "./Question"

// from https://github.com/reactjs/react-tabs
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';


class Dashboard extends Component {

    render() {
        const {answeredQuestions, unansweredQuestions, user} = this.props;


        return (
            <div>
                <h3 className="center">Would you rather</h3>
                <div className="login">
                    <span>Hello, {user.name}</span>
                </div>
                <div>
                    <Tabs>
                        <TabList>
                            <Tab>Unanswered Questions</Tab>
                            <Tab>Answered Questions</Tab>
                        </TabList>

                        <TabPanel>
                            <ul>
                                {unansweredQuestions.map((id) => (
                                    <li key={id}>
                                        <Question id={id}/>
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                        <TabPanel>
                            <ul>
                                {answeredQuestions.map((id) => (
                                    <li key={id}>
                                        <Question id={id}/>
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}


function mapStateToProps({questions, users, authedUser}) {
    let user;

    if (authedUser !== null) {
        user = users[authedUser];
    }
    const answeredQuestions = Object.keys(user.answers) ? Object.keys(user.answers)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp) : [];
    const unansweredQuestions = Object.keys(questions).filter(id => !answeredQuestions.includes(id))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
    return {
        answeredQuestions,
        unansweredQuestions,
        user
    }
}

export default connect(mapStateToProps)(Dashboard)