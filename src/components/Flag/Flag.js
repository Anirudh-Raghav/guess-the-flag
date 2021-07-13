import React, { Component } from 'react';

import './Flag.css';

class Flag extends Component {
    render() {
        return (
            <img className="image" src={this.props.url} alt="Loading ..." />
        )
    }
}


export default Flag;
