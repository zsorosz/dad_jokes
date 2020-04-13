import React, { Component } from 'react';
import Jokes from './Jokes';
import './JokeApp.css';
import axios from "axios";
const API_URL = 'https://icanhazdadjoke.com/';

class JokeApp extends Component {
    constructor(props){
        super(props);
        this.state = { jokes: [] };
    }

    async componentDidMount(){
        let res = await axios.get(API_URL, {
            headers: { Accept: "application/json" }
            });
        console.log(res.data.joke)
    }

    render(){
        return(
            <div className="JokeApp">
                <h1>Dad Jokes</h1>
                <button>New Jokes</button>
                <Jokes />
            </div>
        )
    }
}

export default JokeApp;
