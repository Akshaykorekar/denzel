import React, { Component } from 'react';
import './App.css';
import Deck from './Components/Deck';
import RandomButton from './Components/RandomButton';

class App extends Component {
  render() {
    return (

     
      <div class="text-center">
      <h1 > Example of Denzel Movies</h1>
      <br></br>
      <RandomButton/>
      
       <br></br>
       <Deck/>
      </div>
    );
  }
}

export default App;