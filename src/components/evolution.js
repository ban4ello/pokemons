import Type from '../type.js';
import React, { Component } from 'react'
import  '../style/evolution.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Evolution extends Component {
  constructor (props) {
    super(props);
  };
  getType (data) {
    const typesList = data.types.map((type, index) => {
      return <Type key={index} name={type.type.name} />
    });
    return typesList;
  }
  render() {
    let finalEvol = this.props.evolutionInfo.evolution.map((elem, index, evolution) => {
      let type = this.props.evolutionInfo.evolutionList.map((item) => {
        return this.getType(item);
      });
      let indexEvol = this.props.evolutionInfo.evolutionList.map((item) => {
        let pokemonIndex = (item.id < 10) ? '00' + item.id :
        (item.id < 100) ? '0' + item.id : item.id;
        return pokemonIndex;
      })

      let onlyFirstLevel = evolution.filter((elem) => {
        return elem.level == '1';
      });
      let onlySecondLevel = evolution.filter((elem) => {
        return elem.level == '2';
      });
      let onlyThirdLevel = evolution.filter((elem) => {
        return elem.level == '3';
      });

      if (evolution.length == 1) {
        return (
          <div key={index} className={'onePokemon'}>
            <p>This Pokémon does not evolve.</p>
          <div className={'homeless'}>
            <Link to={`/pokemon/${elem.name}/`}>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${indexEvol[index]}.png`} className="imgFooter" alt="pokemon"></img>
              <h3>{elem.name}<span> #{indexEvol[index]}</span></h3>
              {type[index]}
            </Link>
          </div>
        </div>
        );
      }
      if (onlySecondLevel.length == 1 && onlyThirdLevel.length == 0) {
        return (
          <div key={index} className={'onlyTwoPokemon'}>
          <div className={'level' + elem.level}>
            <Link to={`/pokemon/${elem.name}/`}>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${indexEvol[index]}.png`} className="imgFooter" alt="pokemon"></img>
              <h3>{elem.name}<span> #{indexEvol[index]}</span></h3>
              {type[index]}
            </Link>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
        );
      }

      if (onlySecondLevel.length > 2 && onlyThirdLevel.length == 0) {
        console.log('how EEVEE');
        return (
          <div key={index} className={'eevee'}>
            <div className={'blok' + elem.level}>
              <div className={'level' + elem.level}>
                <Link to={`/pokemon/${elem.name}/`}>
                  <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${indexEvol[index]}.png`} className="imgFooter" alt="pokemon"></img>
                  <h3>{elem.name}<span> #{indexEvol[index]}</span></h3>
                  {type[index]}
                </Link>
                <ul>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        );
      }
      if (onlySecondLevel.length == 2) {
        console.log('ok');
        return (
          <div key={index} className={'onlyTwoLevel2'}>
              <div className={'level' + elem.level}>
                <Link to={`/pokemon/${elem.name}/`}>
                  <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${indexEvol[index]}.png`} className="imgFooter" alt="pokemon"></img>
                  <h3>{elem.name}<span> #{indexEvol[index]}</span></h3>
                  {type[index]}
                </Link>
                <ul>
                  <li></li>
                </ul>
              </div>
          </div>
        );
      }
      return (
        <div className={'threeEvol'} key={index}>
          <div className={'level' + elem.level}>
            <Link to={`/pokemon/${elem.name}/`}>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${indexEvol[index]}.png`} className="imgFooter" alt="pokemon"></img>
              <h3>{elem.name}<span> #{indexEvol[index]}</span></h3>
              {type[index]}
            </Link>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      );
    })

    return (
      <div className="pokemon-evolution">
        <h2>Evolutions</h2>
        <div className="evolution-profile">
          {finalEvol}
        </div>
      </div>
    )
  }
}
