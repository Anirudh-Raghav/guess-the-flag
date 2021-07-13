import React, { Component } from 'react';

// import GameQuestion from '';
import questionStates from '../../constants/questionStates.js';
import QuestionFlag from '../../components/Flag/Flag.js';
import QuestionOptions from '../../components/Question/Question.js';

import './CountryGame.css';

class CountryGame extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            flag: undefined,
            options: [],
            correct: undefined,
            questionState: questionStates.QUESTION,
            tries: 3
        }

        this.onAnswer = this.onAnswer.bind(this);
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
            question.options.push(this.getOption(correctId, countries));
        }
        question.options = this.shuffle(question.options);

        return question;
    }

    // Gets one random option which isn't the answer to the question
    getOption(correctId, countries) {
        const optionId = Math.floor(Math.random() * countries.length);
        if (optionId === correctId) {
            return this.getOption(correctId, countries);
        }

        return { id: optionId, name: countries[optionId].name };
    }

    onAnswer(guess) {
        const { correct } = this.state;
        if (correct) {
            if (guess === correct) this.setState({ questionState: questionStates.CORRECT_ANSWER });
            else this.setState({ questionState: questionStates.WRONG_ANSWER });
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
            tries: 3
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
        return (
            <div className="container">
                <div className="main-app">
                    <QuestionOptions options={this.state.options} />
                    <QuestionFlag url={this.state.flag} />
                </div>
            </div>
        )
    }
}


export default CountryGame;
