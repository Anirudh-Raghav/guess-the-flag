import React, { Component } from 'react';

import './Question.css';

class Question extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const optionId = e.target.getAttribute("data-index");

        this.props.handleAttempt(optionId);
    }

    render() {
        return (
            <ul className="options">
                {this.props.options.map((option) => (<li key={option.id} data-index={option.id} className="option" onClick={this.handleClick}>{option.name}</li>))}
            </ul>
        )
    }
}


export default Question;
