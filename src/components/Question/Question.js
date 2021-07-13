import React, { Component } from 'react';

import './Question.css';

class Question extends Component {
    render() {
        return (
            <ul className="options">
                {this.props.options.map((option) => (<li key={option.id} className="option">{option.name}</li>))}
            </ul>
        )
    }
}


export default Question;
