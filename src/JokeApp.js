import React, { Component } from 'react';
import Jokes from './Jokes';
import './JokeApp.css';

class JokeApp extends Component {
    render(){
        return(
            <div className="JokeApp">
                <h1>Hello from the JokeApp</h1>
                <Jokes />
            </div>
        )
    }
}

export default JokeApp;
