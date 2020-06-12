import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {handleAddQuestion} from "../actions/shared";
import {connect} from "react-redux"


class NewQuestion extends Component {

    state = {
        textOptionOne: "",
        textOptionTwo: "",
        toHome: false
    };


    handleOptionChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };


    handleSubmit = (e) => {
        e.preventDefault();

        const {textOptionOne, textOptionTwo} = this.state;
        const {dispatch, authedUser} = this.props;

        dispatch(handleAddQuestion({
            author: authedUser,
            optionOneText: textOptionOne,
            optionTwoText: textOptionTwo
        }));


        this.setState({
            textOptionOne: "",
            textOptionTwo: "",
            toHome: true
        })
    };


    render() {

        const {textOptionOne, textOptionTwo, toHome} = this.state;
        const {user} = this.props;


        if (toHome === true) {
            return <Redirect to="/"/>

        }

        return (
            <div>
                <div>
                    <span>Hello, {user.name}</span>
                </div>
                <div>
                    <h2 className="center"> Would You Rather? </h2>
                    <h3 className="center"> Compose new Question </h3>
                    <form className="new-question"
                          onSubmit={this.handleSubmit}>
                    <textarea
                        name="textOptionOne"
                        placeholder="Place Option one"
                        value={textOptionOne}
                        onChange={this.handleOptionChange}
                        className="textarea"
                        maxLength={280}

                    />
                        <textarea
                            name="textOptionTwo"
                            placeholder="Place Option two"
                            value={textOptionTwo}
                            onChange={this.handleOptionChange}
                            className="textarea"
                            maxLength={280}

                        />
                        <button
                            className="btn"
                            type="submit"
                            disabled={textOptionOne === "" || textOptionTwo === ""}>
                            Submit
                        </button>
                    </form>
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
    return {
        authedUser,
        user
    }
}

export default connect(mapStateToProps)(NewQuestion)