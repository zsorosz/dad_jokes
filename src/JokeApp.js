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
            jokes.push({text: res.data.joke, votes: 0})
        }
        this.setState({ jokes: jokes });
        console.log(this.state.jokes);
    }

    render(){
        return(
            <div className="JokeApp">
                <div className="JokeApp-sidebar">
                    <h1 className="JokeApp-title">Dad Jokes</h1>
                    <img src="https://www.svgrepo.com/show/209006/laughing-emoji.svg" alt="laughing"></img>
                    <button className="JokeApp-button">New Jokes</button>
                </div>
                <div className="JokeApp-jokes">
                    {this.state.jokes.map(j => (
                        <Joke text={j.text} votes={j.votes} />
                    ))}
                </div>
            </div>
        )
    }
}

export default JokeApp;
