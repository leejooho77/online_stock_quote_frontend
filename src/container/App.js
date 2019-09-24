import React, { Component } from 'react';
import Header from '../components/Header'
import Render from './Render';
import './App.css';

const ws = new WebSocket("ws://localhost:9000/ws")

class App extends Component {
  constructor() {
    super();
    this.state = {
      ws,
      quotes: [],
    }
  }

  componentDidMount() {
    const webSocket = this.state.ws;
    webSocket.onopen = () => {
      console.log("connection has established");
    }

    webSocket.onmessage = evt => {
      const message = JSON.parse(evt.data);
      if(message.type === "stockhistory") {
        let { symbol, history } = message;
        this.setState(state => {
          let quotes = state.quotes.slice();
          quotes.push({ symbol, prices: history })
          return {quotes};
        });
      } else {
        let { symbol, price } = message;
        this.setState(state => {
          let quotes = state.quotes.slice();
          quotes.map(quote => {
            if(quote.symbol === symbol) {
              quote.prices.push(price) 
            }
            return quote;
          })
          return {quotes};
        })
      }
    }

    webSocket.onclose = () => {
      console.log("disconnected successfully")
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Render quotes={this.state.quotes} />
      </div>
    );
  }
}

export default App;
