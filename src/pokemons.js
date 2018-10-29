import React, { Component } from 'react';
import Pokemon from './pokemon.js';
import {GetPokemons, GetPokemon} from './get-pokemons.js';
import  './style/main.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Pokemons extends Component {
  constructor () {
    super();
    this.state = {loading: false, step: 12, currentIndex: 0, pokemons: [], showBtn: true,};
    this.loadNextPokemon = this.loadNextPokemon.bind(this)
  };

  componentDidMount() {
    this.getNextPokemons();

  };

  getNextPokemons () {
    this.setState({
      loading: true,
    });

    const to = this.state.currentIndex + this.state.step;
    return GetPokemons(this.state.currentIndex + 1, to)
      .then(pokemonsList => {
        this.setState({
          loading: false,
          currentIndex: to,
          pokemons: [...this.state.pokemons, ...pokemonsList],
        });

      });
  };

  loadNextPokemon () {
    if (this.state.loading) {
      return;
    }

    this.getNextPokemons()
      .then(() => {
        this.setState({
          showBtn: true,
        });
      });
  }

  render() {
    // console.log(this.state.pokemons);
    const pokemonList = this.state.pokemons.map((pokemon) => {
      return <Pokemon key={pokemon.id} pokemon={pokemon} />
    });

    const loadMoreButtonClass = `${this.state.showBtn ? 'show' : ''}`;
    const loadMoreButtonText = this.state.loading ? 'Loading...' : 'Load more Pokemon';

    return (
      <div className="wraper">
        <div className="App" >
          {pokemonList}
        </div>
        <a id="loadMore" className={loadMoreButtonClass}>
          <span onClick={this.loadNextPokemon} id="btnLoadNextPokemons" className='button-lightblue'>
            {loadMoreButtonText}
          </span>
        </a>
        <span id="showScroll"></span>
      </div>
    );
  }
  }

export default Pokemons;
