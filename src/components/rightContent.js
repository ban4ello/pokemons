import React, { Component } from 'react';
import '../style/rightContent.scss';
import Type from './type.js';
import PropTypes from 'prop-types';

export default class RightContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedVersionIndex: 0,
    };
    this.getVersionPokemon = this.getVersionPokemon.bind(this);
  }

  componentDidUpdate (prevProps) {
    if (JSON.stringify(prevProps.pokemon.descriptionList) !== JSON.stringify(this.props.pokemon.descriptionList)) {
      this.setState({
        selectedVersionIndex: 0,
      });
    }
  }

  getVersionPokemon (e) {
    if (!e) return;

    const target = e.target || e.srcElement;

    this.setState({
      selectedVersionIndex: target.value,
    });
  }

  getType (types) {
    const typesList = types.map((type, index) => {
      return <Type key={index} name={type.type.name} />;
    });

    return typesList;
  }

  render () {
    const version = this.props.pokemon.descriptionList
      ? this.props.pokemon.descriptionList.map((elem, index) => {
        return <option key={index} value={index}>{elem.version}</option>;
      })
      : [];

    const descriptionTextRender = this.props.pokemon.descriptionList
      ? <span>{this.props.pokemon.descriptionList[this.state.selectedVersionIndex].text}</span>
      : <span>loading ...</span>;

    let option = {
      weight: this.props.pokemon.weight,
      height: this.props.pokemon.height,
      category: this.props.pokemon.category,
      type: this.getType(this.props.pokemon.types),
    };

    const ability = this.props.pokemon.abilities.find(({ is_hidden }) => !is_hidden);
    const abilityRender = ability
      ? <li>
        <span className="atribute-title">Abilities</span>
        <span className="atribute-value">{ability.ability.name}</span>
      </li>
      : <li></li>;


    return (
      <div className="right-content">
        <div className="discription">
          {descriptionTextRender}
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
                <span className="atribute-value">
                  {option.height}{`'`}
                </span>
              </li>
              <li>
                <span className="atribute-title">Weight</span>
                <span className="atribute-value">{((option.weight / 10) * 2.2046).toFixed(1)} lbs</span>
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
              {abilityRender}
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
    );
  }
}

RightContent.propTypes = {
  pokemon: PropTypes.object,
};
