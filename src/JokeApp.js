import React, { Component } from 'react';
import Joke from './Joke';
import './JokeApp.css';
import uuid from 'uuid/v4';
import axios from "axios";
const API_URL = 'https://icanhazdadjoke.com/';

class JokeApp extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props){
        super(props);
        this.state = { 
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"), 
            loading: false
        };
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        if(this.state.jokes.length === 0) this.getJokes();
    }
    async getJokes(){
        try {
        let jokes = [];
        while(jokes.length < this.props.numJokesToGet){
            let res = await axios.get(API_URL, {
                headers: { Accept: "application/json" }
                });
            let newJoke = res.data.joke;
            if(!this.seenJokes.has(newJoke)){
                jokes.push({id: uuid(), text: newJoke, votes: 0})
            } else {
                console.log("Found a duplicate");
                console.log(newJoke);
            }
        }
        this.setState(st => ({
            loading: false,
            jokes: [...st.jokes, ...jokes]
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
        } catch(e) {
            alert(e);
            this.setState({loading: false});
        }
    }

    handleClick(){
        this.setState({ loading: true }, this.getJokes);
    }

    handleVote(id, delta){
        this.setState(st => ({
            jokes: st.jokes.map(j =>
                j.id === id ? {...j, votes: j.votes + delta} : j
            )
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }

    render(){
        if(this.state.loading){
            return(
                <div className="JokeApp-spinner">
                    <i className="far fa-8x fa-laugh fa-spin"></i>
                    <h1 className="JokeApp-title">Loading...</h1>
                </div>
            )
        }
        let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
        return(
            <div className="JokeApp">
                <div className="JokeApp-sidebar">
                    <h1 className="JokeApp-title">Dad Jokes</h1>
                    <img src="https://www.svgrepo.com/show/209006/laughing-emoji.svg" alt="laughing"></img>
                    <button className="JokeApp-button" onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className="JokeApp-jokes">
                    {jokes.map(j => (
                        <Joke 
                            key={j.id} 
                            text={j.text} 
                            votes={j.votes} 
                            upvote={() => this.handleVote(j.id, 1)}
                            downvote={() => this.handleVote(j.id, -1)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default JokeApp;
