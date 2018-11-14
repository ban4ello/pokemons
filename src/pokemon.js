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

    let arrayIconName = [ 'Collection', 'Wishlist', 'Trade', ];
    const icon = arrayIconName.map((item) => {
      return (
        <div className={`${item}`} key={item}>
          <a href="#" title={`Add to My ${item}`}>
            <span className={`icon icon_${item.toLowerCase()}`}></span>
          </a>
        </div>
      )
    })

    return (
      <div className="pokemon">
        <Link to={`/pokemon/${pokemonName}/`}>
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.index}.png`} className="imgFront" alt="pokemon"></img>
        </Link>

        <div className="collectibles">
          {icon}
        </div>
        <p className="pokemon-index">#{pokemon.index}</p>
        <h2>{pokemon.name}</h2>
        {typesList}
      </div>
    );
  }
}


export default Pokemon;
