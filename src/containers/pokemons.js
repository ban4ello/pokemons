import React, { Component } from 'react';
import Pokemon from '../components/pokemon.js';
import {getListAllPokemon, getPokemons } from '../api/fetch.js';
import '../style/main.scss';
import { connect } from 'react-redux';
import { getPokemonsAction, pokemonsSuccessAction, getAllPokemon } from '../redux/actions/create-actions';
import PropTypes from 'prop-types';


class Pokemons extends Component {
  constructor (props) {
    super(props);
    this.state = {
      step: 12,
      showBtn: true,
    };
    this.loadNextPokemon = this.loadNextPokemon.bind(this);
  }

  componentDidMount () {
    if (this.props.allPokemons.length === 0) {
      this.pokemonsList();
    }
    if (this.props.currentIndex === 0) {
      this.getNextPokemons();
    }
  }

  pokemonsList () {
    return getListAllPokemon()
      .then( data => {
        this.props.getAllPokemon(data);
      });
  }

  getNextPokemons () {
    this.props.getPokemonsAction();

    const to = this.props.currentIndex + this.state.step;

    return getPokemons(this.props.currentIndex + 1, to)
      .then(pokemonsList => {
        this.props.pokemonsSuccessAction({data: pokemonsList, to} );
      });
  }

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

  render () {
    const validPokemon = this.props.allPokemons.slice(0, this.props.currentIndex);
    const pokemon = validPokemon.map((pokemon) => {
      return <Pokemon key={pokemon.id} pokemon={pokemon} />;
    });

    const loadMoreButtonClass = `${this.state.showBtn ? 'show' : ''}`;
    const loaderClass = `${this.props.showLoader ? 'loader' : ''}`;
    const loadMoreButtonText = this.props.loading ? 'Loading...' : 'Load more Pokemon';

    return (
      <div className="wraper">

        <div className={loaderClass}></div>

        <div className="App" >
          {pokemon}
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

export default connect(
  (state) => {
    const { pokemonsList } = state;

    return {
      loading: pokemonsList.loading,
      showLoader: pokemonsList.showLoader,
      currentIndex: pokemonsList.currentIndex,
      allPokemons: pokemonsList.allPokemons,
    };
  },
  { getPokemonsAction, pokemonsSuccessAction, getAllPokemon }
)(Pokemons);

Pokemons.propTypes = {
  allPokemons: PropTypes.array,
  currentIndex: PropTypes.number,
  loading: PropTypes.bool,
  showLoader: PropTypes.bool,
  getAllPokemon: PropTypes.func,
  getPokemonsAction: PropTypes.func,
  pokemonsSuccessAction: PropTypes.func,
};
