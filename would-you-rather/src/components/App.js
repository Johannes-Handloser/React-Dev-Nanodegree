import React, {Component, Fragment} from 'react';
import {connect} from "react-redux"
import {handleInitialData} from "../actions/shared";
import Dashboard from "./Dashboard"
import LoadingBar from "react-redux-loading"
import Nav from "./Nav"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import NewQuestion from "./NewQuestion"
import Leaderboard from "./Leaderboard";
import QuestionDetail from "./QuestionDetail";
import Auth from "./Auth";
import Logout from "./Logout";
import SecureRoute from "./SecureRoute";



class App extends Component {

    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }



    render() {

        const { authedUser } = this.props;

        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className="container">
                        <Nav/>
                        <div>
                            <div>
                                <Switch>
                                    <SecureRoute  exact path="/"  component={Dashboard}
                                             isAuthenticated={authedUser != null}/>
                                    <SecureRoute  path="/add" component={NewQuestion}
                                             isAuthenticated={authedUser != null}/>
                                    <SecureRoute  path="/leaderboard" component={Leaderboard}
                                             isAuthenticated={authedUser != null}/>
                                    <SecureRoute  path="/questions/:id" component={QuestionDetail}
                                             isAuthenticated={authedUser != null}/>

                                    <Route  path='/auth' component={Auth}/>
                                    <Route  path='/logout' component={Logout} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Fragment>
            </Router>
        )
    }
}


function mapStateToProps ({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(App)
