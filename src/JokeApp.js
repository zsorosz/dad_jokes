import React, { Component } from 'react';
import Joke from './Joke';
import './JokeApp.css';
import axios from "axios";
const API_URL = 'https://icanhazdadjoke.com/';

class JokeApp extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props){
        super(props);
        this.state = { jokes: [] };
    }

    async componentDidMount(){
        let jokes = [];
        while(jokes.length < this.props.numJokesToGet){
            let res = await axios.get(API_URL, {
                headers: { Accept: "application/json" }
                });
            jokes.push(res.data.joke)
        }
        this.setState({ jokes: jokes});
        console.log(this.state.jokes);
    }

    render(){
        return(
            <div className="JokeApp">
                <h1>Dad Jokes</h1>
                <div>
                    {this.state.jokes.map(j => (
                        <div>{j}</div>
                    ))}
                </div>
                <button>New Jokes</button>
                <Joke />
            </div>
        )
    }
}

export default JokeApp;
