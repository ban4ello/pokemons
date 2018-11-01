import React, { Component } from 'react';
import Pokemon from './pokemon.js';
import {GetPokemons, GetPokemon} from './get-pokemons.js';
import  './style/main.scss';
import { getPokemonsActionCreator } from './test.js';
import store from './test.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Pokemons extends Component {
  constructor () {
    super();
    const globalState = store.getState();
    this.state = {loading: globalState.loading, step: 12, currentIndex: globalState.currentIndex, pokemons: globalState.pokemons, showBtn: true,};
    console.log(this.state.pokemons.length);
    this.loadNextPokemon = this.loadNextPokemon.bind(this)
    store.subscribe(() => {
      const globalState = store.getState();
      this.setState({
        loading: globalState.loading,
        pokemons: globalState.pokemons,
        currentIndex: globalState.currentIndex,
      });
      console.log(this.state.pokemons.length);
      console.log('updated', globalState);
    });
  };

  componentDidMount() {
    if (this.state.pokemons.length == 0) {
      this.getNextPokemons();
    }  
  };

  getNextPokemons () {
    this.setState({
      loading: true,
    });

    const from = this.state.currentIndex + 1;
    const to = this.state.currentIndex + this.state.step;

      return getPokemonsActionCreator(store, from, to);
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
