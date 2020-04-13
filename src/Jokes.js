import React, { Component } from 'react';
import Joke from './Joke';
import './Jokes.css';

class Jokes extends Component {
    render(){
        return(
            <div className="Jokes">
                <h1>Hello from the Jokes component</h1>
                <Joke />
                <Joke />
                <Joke />
            </div>
        )
    }
}

export default Jokes;