import React, {Component} from "react"
import {connect} from "react-redux"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {setAuthedUser} from "../actions/authedUser";
import {Redirect, withRouter} from 'react-router-dom'


class Auth extends Component {

    state = {
        redirect: false,
    };

    handleLogin = (e) => {
        const { dispatch } = this.props;
        dispatch(setAuthedUser(e.value));
        this.setState(() => ({
            redirect: true
        }))
    };

    render() {
        const {users, authedUser} = this.props;
        const { redirect } = this.state;

        const {from} = this.props.location.state || {from: {pathname: '/'}};

        console.log(from)

        if (redirect || authedUser != null) {
            return <Redirect to={from} />
        }

        return (
            <div className="center">
                <h2>Welcome to "Would You Rather"</h2>
                <h3>Please login with existing user</h3>
                <Dropdown options={users}
                          placeholder="Select an user"
                          onChange={this.handleLogin}/>
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        users: Object.keys(users),
        authedUser

    }
}



export default withRouter(connect(mapStateToProps)(Auth))