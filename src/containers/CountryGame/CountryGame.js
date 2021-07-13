import React, { Component } from 'react';

// import GameQuestion from '';
import questionStates from '../../constants/questionStates.js';
import QuestionFlag from '../../components/Flag/Flag.js';
import QuestionOptions from '../../components/Question/Question.js';
import NextButton from '../../components/NextButton/NextButton.js';

import SyncLoader from "react-spinners/SyncLoader";

import './CountryGame.css';

class CountryGame extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            flag: undefined,
            options: [],
            correct: undefined,
            questionState: undefined,
        }

        this.onAttempt = this.onAttempt.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    // Frames a new question with randomised 
    frameQuestion(countries) {
        const correctId = Math.floor(Math.random() * countries.length);
        const correct = { id: correctId, name: countries[correctId].name };

        // Setting up correct flag answer
        let question = {
            correct,
            flag: countries[correctId].flag,
            options: []
        };

        // Setting up the options
        question.options.push(correct);
        for (let i = 0; i < 3; i++) {
            question.options.push(this.getOption(question.options, countries));
        }
        question.options = this.shuffle(question.options);

        return question;
    }

    // Gets one random option which isn't the answer to the question
    getOption(arr, countries) {
        const optionId = Math.floor(Math.random() * countries.length);
        const option = { id: optionId, name: countries[optionId].name }
        if (arr.includes(option)) {
            return this.getOption(arr, countries);
        }

        return option;
    }

    onAttempt(guess) {
        const correctId = this.state.correct.id;
        if (correctId) {
            if (parseInt(guess) === correctId) {
                this.setState({ questionState: questionStates.CORRECT_ANSWER });
            }
            else {
                this.setState({ questionState: questionStates.WRONG_ANSWER });
            }
        }
    }

    shuffle(array) {
        var currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    // Courtesy to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    nextQuestion() {
        const { countries } = this.state;
        const question = this.frameQuestion(countries);
        this.setState({
            countries,
            flag: question.flag,
            options: question.options,
            correct: question.correct,
            questionState: questionStates.QUESTION,
        });
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(result => result.json())
            .then(countries => {
                const question = this.frameQuestion(countries);
                this.setState({
                    countries,
                    flag: question.flag,
                    options: question.options,
                    correct: question.correct,
                    questionState: questionStates.QUESTION
                });
            })
            .catch((err) => console.error(err));
    }

    render() {

        let output;

        switch (this.state.questionState) {
            case questionStates.QUESTION:
                output = (<>
                    <QuestionOptions correctAnswer={this.state.correct} options={this.state.options} questionState={this.state.questionState} handleAttempt={this.onAttempt} nextQuestion={this.nextQuestion} />
                    <QuestionFlag url={this.state.flag} />
                </>);
                break;
            case questionStates.CORRECT_ANSWER:
                output = (<div className="aftermath-container">
                    <h1 className="aftermath correct"><i className="fas fa-check"></i>&nbsp;{this.state.correct.name} is the correct answer</h1>
                    <NextButton nextQuestion={this.nextQuestion} />
                </div>);
                break;

            case questionStates.WRONG_ANSWER:
                output = (<div className="aftermath-container">
                    <h1 className="aftermath wrong"><i className="fas fa-times"></i>&nbsp;Your answer is wrong, {this.state.correct.name} is the correct</h1>
                    <NextButton nextQuestion={this.nextQuestion} />
                </div>);
                break;
            default:
                output = (<SyncLoader color="#5b6977" size="20px" margin="5px" />)
                break;

        }

        return (
            <div className="container">
                <div className="main-app">
                    {output}
                </div>
            </div>
        )
    }
}


export default CountryGame;
