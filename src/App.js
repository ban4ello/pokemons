import React, { Component } from 'react';
import Pokemons from './pokemons.js';
import PokemonInside from './pokemonInside.js';
import  './style/main.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor () {
    super();
  };

  render() {
    return (
      <Router>
    <div>
          <Link to="/pokemons/">Home</Link>
      <hr />
      <Route exact path="/pokemons" component={Pokemons} />
      <Route path="/pokemon/:name" component={PokemonInside} />

    </div>
  </Router>
    );
  }
}

export default App;
