import React, { Component } from 'react'
import  '../style/discription.scss';
import {pokemonInfo} from './fetch.js';
import Type from '../type.js';


export default class Discription extends Component {
  constructor (props) {
    super(props);
    // console.log(props);
    // console.log(this.props.pokemonInfo.discriptionText);
    this.state = {
      discriptionText: props.pokemonInfo.discriptionText,
      discription: props.pokemonInfo.discription,
    };
    this.getVersionPokemon = this.getVersionPokemon.bind(this);
  };

  componentDidUpdate (prevProps) {
    if (prevProps.pokemonInfo.discription !== this.props.pokemonInfo.discription) {
      this.setState({
        discriptionText: this.props.pokemonInfo.discriptionText,
        discription: this.props.pokemonInfo.discription,
      });
    }
  };

  componentDidMount() {

  };

  getVersionPokemon (e) {
    if (!e) return;

    const target = e.target || e.srcElement;
    const currentOption = this.state.discription[target.value];

    if (!currentOption) return;

    this.setState({
      discriptionText: currentOption.text
    });
  };

  getType (data) {
    const typesList = data.types.map((type, index) => {
      return <Type key={index} name={type.type.name} />
    });
    return typesList;
  }


  render() {
    const version = this.props.pokemonInfo.discription.map((elem, index) => {
      return <option key={index} value={index}>{elem.version}</option>;
    });

    let option = {
      abilities: this.props.pokemonInfo.abilities.ability.name,
      weight: this.props.pokemonInfo.weight,
      height: this.state.height,
      category: this.props.pokemonInfo.category,
      height: this.props.pokemonInfo.height,
      type: this.props.pokemonInfo.type,
    };

    return (
      <div className="right-content">
        <div className="discription">
          <span>{this.state.discriptionText}</span>
          <div className="versions-menu">
            <span>Version: </span>
            <select onChange={this.getVersionPokemon} name="selectBtn1" id="selectBtn1">
              {version}
            </select>
          </div>
        </div>

        <div className="version">
        </div>
        <div className="pokemon-ability-info">
          <div className="ability-info-left">
            <ul>
              <li>
                <span className="atribute-title">Height</span>
                <span className="atribute-value">{option.height}'</span>
              </li>
              <li>
                <span className="atribute-title">Weight</span>
                <span className="atribute-value">{option.weight} lbs</span>
              </li>
              <li>
                <span className="atribute-title">Gender</span>
                <span className="atribute-value">
                  <i className="icon icon_male_symbol"></i>
                  <i className="icon icon_female_symbol"></i>
                </span>
              </li>
            </ul>
          </div>
          <div className="ability-info-right">
            <ul>
              <li>
                <span className="atribute-title">Category</span>
                <span className="atribute-value">{option.category}</span>
              </li>
              <li>
                <span className="atribute-title">Abilities</span>
                <span className="atribute-value">{option.abilities}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pokemon-type-info">
          <div className="type-list">
            <div className="type-text">
              <h3>Type</h3>
            </div>
            {option.type}
          </div>
          {/* <div className="weaknesses">
            <div className="weaknesses-text">
              <h3>Weaknesses</h3>
            </div>
            {this.state.type}
          </div> */}
        </div>
      </div>
    )
  }
}
