import React, { Component } from 'react';
import Pokemon from './pokemon.js';
// import {getPokemons, GetPokemon} from './get-pokemons.js';
import {getListAllPokemon, getPokemons, } from './components/fetch.js';
import  './style/main.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPokemonsAction, pokemonsSuccessAction, getAllPokemon } from "./actions/create-actions";


class Pokemons extends Component {
  constructor (props) {
    super(props);
    this.state = {
      step: 12,
      showBtn: true,
    };
    this.loadNextPokemon = this.loadNextPokemon.bind(this)
  };

  componentDidMount() {
    // console.log(this.props.allPokemons);
    if (this.props.allPokemons.length === 0) {
     this.pokemonsList();
   }
   if (this.props.currentIndex === 0) {
     this.getNextPokemons();
   }
  };

  pokemonsList () {
    return getListAllPokemon()
    .then( data => {
      this.props.getAllPokemon(data)
    })
  }

  getNextPokemons () {
    this.props.getPokemonsAction();

    const to = this.props.currentIndex + this.state.step;
    return getPokemons(this.props.currentIndex + 1, to)
      .then(pokemonsList => {

        this.props.pokemonsSuccessAction({data: pokemonsList, to} );
      });
  };

  loadNextPokemon () {
    if (this.props.loading) {
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
    // console.log(this.state);
    // const pokemonList = this.props.pokemons.map((pokemon) => {
    //   return <Pokemon key={pokemon.id} pokemon={pokemon} />
    // });

    const validPokemon = this.props.allPokemons.slice(0, this.props.currentIndex)
    const test = validPokemon.map((pokemon) => {

      return <Pokemon key={pokemon.id} pokemon={pokemon} />
    });

    // console.log(this.props.allPokemons);
    // console.log(validPokemon);

    const loadMoreButtonClass = `${this.state.showBtn ? 'show' : ''}`;
    const loadMoreButtonText = this.props.loading ? 'Loading...' : 'Load more Pokemon';

    return (
      <div className="wraper">
        <div className="App" >
          {/* {pokemonList} */}
          {test}
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
;

export default connect(
  (state) => {
    // console.log(state);
    const { pokemonsList } = state;

    return {
      loading: pokemonsList.loading,
      currentIndex: pokemonsList.currentIndex,
      allPokemons: pokemonsList.allPokemons,
    };
  },
  { getPokemonsAction, pokemonsSuccessAction, getAllPokemon }
)(Pokemons);
