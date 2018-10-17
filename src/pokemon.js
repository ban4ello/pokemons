import React, { Component } from 'react';
import Type from './type.js';
import  './style/main.scss';

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
    const typesList = pokemon.types.map((type, index) => {
      return <Type key={index} name={type.type.name} />
    });

    return (
      <div className="pokemon">
        <img src={pokemon.sprites.front_default}></img>
        <div>{pokemon.name}</div>
        {typesList}
      </div>
    );
  }
}


export default Pokemon;
