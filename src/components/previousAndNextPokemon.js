import React, { Component } from 'react'
import  '../style/previousAndNextPokemon.scss';
import { getPokemonsList } from './fetch';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class PreviousAndNextPokemon extends Component {
  constructor (props) {
    super(props);
  };

  render() {
    return (
      <div className="header">
        <div className="pokedex-pokemon-pagination">

          <Link to={`/pokemon/${this.props.pokemonPrevios.name}/`} className="previous">
            <div className="pokedex-pokemon-pagination-wrapper">
              <span className="icon icon_arrow_sm_left"></span>
              <span className="pokemon-number">#{this.props.pokemonPrevios.index}</span>
              <span className="pokemon-name" id="pokemon-name">{this.props.pokemonPrevios.name}</span>
            </div>
          </Link>
          <Link to={`/pokemon/${this.props.pokemonNext.name}/`} className="next">
            <div className="pokedex-pokemon-pagination-wrapper">
              <span className="icon icon_arrow_sm_right"></span>
              <span className="pokemon-number">#{this.props.pokemonNext.index}</span>
              <span className="pokemon-name" id="pokemon-name">{this.props.pokemonNext.name}</span>
            </div>
          </Link>
        </div>

        <div className="pokedex-pokemon-pagination-title">
          <div className="title-text">
            <span>{this.props.pokemon.name}</span>
            <span>#{this.props.pokemon.index}</span>
          </div>
        </div>

      </div>
    )
  }
}
