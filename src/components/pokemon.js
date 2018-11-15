import React, { Component } from 'react';
import '../style/main.scss';
import '../style/font-awesome.min.css';
import '../style/icon-font.css';
import Type from './type.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Pokemon extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const pokemon = this.props.pokemon;
    const pokemonName = this.props.pokemon.name;
    const typesList = pokemon.types.map((type, index) => {
      return <Type key={index} name={type.type.name} />;
    });

    let arrayIconName = [ 'Collection', 'Wishlist', 'Trade' ];
    const icon = arrayIconName.map((item) => {
      return (
        <div className={`${item}`} key={item}>
          <a href="#" title={`Add to My ${item}`}>
            <span className={`icon icon_${item.toLowerCase()}`}></span>
          </a>
        </div>
      );
    });

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

Pokemon.propTypes = {
  pokemon: PropTypes.object,
};


export default Pokemon;
