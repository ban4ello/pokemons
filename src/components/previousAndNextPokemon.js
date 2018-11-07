import React, { Component } from 'react'
import  '../style/previousAndNextPokemon.scss';
import { getPokemonsList } from './fetch';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class PreviousAndNextPokemon extends Component {
  constructor (props) {
    super(props);
  };

  render() {
    // console.log(this.props);
    let validPreviousIndex = this.props.pokemon.pokemonPrevios.id + 1;
    let validNextIndex = this.props.pokemon.pokemonNext.id + 1;

    let pokemonIndex = (this.props.pokemon.id < 10) ? '00' + this.props.pokemon.id :
                    (this.props.pokemon.id < 100) ? '0' + this.props.pokemon.id : this.props.pokemon.id;

    let indexPreviousPokemon = (validPreviousIndex < 10) ? '00' + validPreviousIndex :
                    (validPreviousIndex < 100) ? '0' + validPreviousIndex : validPreviousIndex;
    let indexNextPokemon = (validNextIndex < 10) ? '00' + validNextIndex :
                    (validNextIndex < 100) ? '0' + validNextIndex : validNextIndex;

    return (
      <div className="header">
        <div className="pokedex-pokemon-pagination">

          <Link to={`/pokemon/${this.props.pokemon.pokemonPrevios.name}/`} className="previous">
            <div className="pokedex-pokemon-pagination-wrapper">
              <span className="icon icon_arrow_sm_left"></span>
              <span className="pokemon-number">#{indexPreviousPokemon}</span>
              <span className="pokemon-name" id="pokemon-name">{this.props.pokemon.pokemonPrevios.name}</span>
            </div>
          </Link>
          <Link to={`/pokemon/${this.props.pokemon.pokemonNext.name}/`} className="next">
            <div className="pokedex-pokemon-pagination-wrapper">
              <span className="icon icon_arrow_sm_right"></span>
              <span className="pokemon-number">#{indexNextPokemon}</span>
              <span className="pokemon-name" id="pokemon-name">{this.props.pokemon.pokemonNext.name}</span>
            </div>
          </Link>
        </div>

        <div className="pokedex-pokemon-pagination-title">
          <div className="title-text">
            <span>{this.props.pokemon.name}</span>
            <span>#{pokemonIndex}</span>
          </div>
        </div>

      </div>
    )
  }
}
