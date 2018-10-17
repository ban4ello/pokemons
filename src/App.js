import React, { Component } from 'react';
import Pokemon from './pokemon.js';
import GetPokemons from './get-pokemons.js';
import  './style/main.scss';

class App extends Component {
  constructor () {
    super();
    this.state = {losding: false, step: 10, currentIndex: 0, pokemons: []};
    this.getNextPokemons = this.getNextPokemons.bind(this)
  };

  componentDidMount() {
    this.getNextPokemons();
  };

  getNextPokemons () {
    if (this.state.loading) {
      return;
    }

    this.setState({
      loading: true,
    });

    const to = this.state.currentIndex + this.state.step;
    GetPokemons(this.state.currentIndex + 1, to)
      .then(pokemonsList => {
        this.setState({
          loading: false,
          currentIndex: to,
          pokemons: [...this.state.pokemons, ...pokemonsList],
        });

      });
  };

  render() {
    // console.log(this.state.pokemons);
    const pokemonList = this.state.pokemons.map((pokemon) => {
      return <Pokemon key={pokemon.id} pokemon={pokemon} />
    });



    return (
      <div className="App" >
        <h1 onClick={this.getNextPokemons}>Pokemon List</h1>
        {pokemonList}
      </div>
    );
  }
}


export default App;
