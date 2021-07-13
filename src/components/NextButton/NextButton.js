import React, { Component } from 'react';

import './NextButton.css';

class NextButton extends Component {
    render() {
        return (
            <i className="next-button fas fa-chevron-right" onClick={this.props.nextQuestion}></i>
        )
    }
}


export default NextButton;
