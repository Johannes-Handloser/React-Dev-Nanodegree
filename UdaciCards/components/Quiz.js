import React, {Component} from 'react';
import {View, Text, Button} from "react-native"

class Quiz extends Component {


    state = {
        questions: [],
        correctlyAnswered: 0,
        current: 0,
        finished: false,
        showAnswer: false
    };

    componentDidMount() {
        this.setState({questions: this.props.navigation.state.params})
    }

    render() {
        const quiz = (
            <View style={{alignItems: 'center', alignContent: 'center'}}>
                {
                    this.state.questions.length === 0 ? null :
                        <View style={{alignItems: 'center'}}>
                            <Text
                                style={{fontSize: 18}}>Question {this.state.current + 1} out {this.state.questions.length}</Text>
                            <View style={{marginTop: 25}}>
                                <Text style={{fontSize: 20}}>{this.state.questions[this.state.current].question}</Text>
                                <Button
                                    onPress={() => this.showAnswer()}
                                    title={this.state.showAnswer ? "Hide Answer" : "View Answer"}
                                />
                                {
                                    this.state.showAnswer ?
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={{fontSize: 18}}>
                                                {this.state.questions[this.state.current].answer}
                                            </Text>
                                        </View> : null
                                }
                            </View>
                            <Button title='Correct' onPress={() => this.checkQuestion(0)}/>
                            <Button title='Incorrect' onPress={() => this.checkQuestion(1)}/>

                        </View>
                }
            </View>
        );

        const finished = (
            <View style={{alignItems: 'center', alignContent: 'center'}}>
                <Text style={{fontSize: 20}}>
                    Number of correctly answered questions is {this.state.correctlyAnswered}
                </Text>
                <Button  title="Restart Quiz" onPress={() => this.restart()}/>
                <Button  title="Back to Deck" onPress={() => this.props.navigation.goBack()}/>
            </View>
        );

        return (
            <View>
                {this.state.finished ? finished : quiz}
            </View>
        )
    }

    checkQuestion(btnFlag) {
        if (this.state.questions[this.state.current].answer === "Correct" && btnFlag === 0) {
            this.userAnswered("true")
        }
        if (this.state.questions[this.state.current].answer === "Incorrect" && btnFlag === 0) {
            this.userAnswered("false")
        }
        if (this.state.questions[this.state.current].answer === "Correct" && btnFlag === 1) {
            this.userAnswered("false")
        }
        if (this.state.questions[this.state.current].answer === "Incorrect" && btnFlag === 1) {
            this.userAnswered("true")
        }
    }

    userAnswered(answer) {
        if (answer === 'true') {
            this.setState({correctlyAnswered: this.state.correctlyAnswered + 1});
        }
        if (this.state.current === this.state.questions.length - 1) {
            this.setState({finished: true});
        } else {
            this.setState({current: this.state.current + 1});
        }
    }

    showAnswer = () => {
        this.setState({showAnswer: !this.state.showAnswer})
    };


    restart = () => {
        this.setState({current: 0, correctlyAnswered: 0, finished: false, showAnswer: false})
    }
}


export default Quiz