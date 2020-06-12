import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser'

class Logout extends Component {
    componentWillMount () {
        this.props.dispatch(setAuthedUser(null))
    }
    render () {
        return <Redirect to='/auth' />
    }
}

export default withRouter(connect()(Logout))