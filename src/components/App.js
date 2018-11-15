import React, { Component } from 'react';
import Pokemons from '../containers/pokemons.js';
import PokemonInside from '../containers/pokemonInside.js';
import '../style/main.scss';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          <Link to="/pokemons/">Home</Link>
          <hr />
          <Route exact path="/pokemons" component={Pokemons} />
          <Route path="/pokemon/:name" component={PokemonInside} />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
