import React, { Component } from 'react';
import  './style/main.scss';
import  './style/font-awesome.min.css';
import  './style/icon-font.css';
import Type from './type.js';
// import PokemonInside from './pokemonInside.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Pokemon extends Component {
  constructor (props) {
    super(props);
    // this.state = {pokemon: {}};
  };

  // componentWillMount () {
  //   this.setState({pokemon: Object.assign({}, this.props.pokemon, {types: [{name: 'Grass'}, {name: 'Poison'}]})});
  // }
  //
  // componentWillReceiveProps () {
  //   console.log(1);
  //   this.setState({pokemon: Object.assign({}, this.props.pokemon, {types: [{name: 'Grass'}, {name: 'Poison'}]})});
  // }

  render() {
    const pokemon = this.props.pokemon;
  
    const pokemonName = this.props.pokemon.name;
    const pokemonId = this.props.pokemon.id;
    const typesList = pokemon.types.map((type, index) => {
      return <Type key={index} name={type.type.name} />
    });

    return (
      <div className="pokemon">
        <Link to={`/pokemon/${pokemonName}/`}>
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.index}.png`} className="imgFront" alt="pokemon"></img>
        </Link>

        <div className="collectibles">

          <div className="collection">
            <a href="#" title="Add to My Collection">
              <span className="icon icon_collection"></span>
            </a>
          </div>

          <div className="wishlist">
            <a href="#" title="Add to My Wish List">
              <span className="icon icon_wishlist"></span>
            </a>
          </div>

          <div className="trade">
            <a href="#" title="Add to My Trade List">
              <span className="icon icon_trade"></span>
            </a>
          </div>

        </div>
        <p className="pokemon-index">#{pokemon.index}</p>
        <h2>{pokemon.name}</h2>
        {typesList}
      </div>
    );
  }
}


export default Pokemon;
