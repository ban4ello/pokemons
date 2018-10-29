import React, { Component } from 'react';
import Pokemon from './pokemon.js';
import Type from './type.js';
import {GetPokemon} from './get-pokemons.js';
import {GetEvolution, GetPokemonInfoEvol} from './get-evolution.js';
import  './style/insidePokemon.scss';
// import  './style/main.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PokemonInside extends Component {
  constructor (props) {
    super(props);
    this.state = {
      discription: [],
      info: [],
      stats: [],
      pokemonPrevios: {},
      pokemonNext: {},
      discriptionText: '',
      height: '',
      weight: '',
      category: '',
      abilities: '',
      evolution: [],
      evolutionList: [],
     };
    this.getPokemonInfo = this.getPokemonInfo.bind(this);
    this.getPokemonsList = this.getPokemonsList.bind(this);
    this.getVersionPokemon = this.getVersionPokemon.bind(this);
    this.evolutionPokemonList = this.evolutionPokemonList.bind(this);
  };

  componentDidMount() {
    this.fetchAllData();
  };

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.fetchAllData();
    }
  };

  fetchAllData () {
    this.getPokemonInfo().then((id) => {
      this.getPokemonsList(id);
    });
    this.getDiscriptionPokemon().then((elem) => {
      this.evolution(elem);
    });
    this.evolutionPokemonList();
  };

  pokemonInfo(name) {
    // return fetch(`https://pokeapi.co/api/v2${name}`).then(
    return fetch(`https://pokeapi.co/api/v2${name}`).then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);

          return;
        }
        return response.json().then(function(data) {
          return data;
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  getPokemonInfo () {
    return this.pokemonInfo(`/pokemon/${this.props.match.params.name}/`)
      .then(data => {
        this.setState({
          info: data,
          stats: this.getAtributes(data),
          height: data.height,
          weight: this.getOptions(data).weight,
          abilities: this.getOptions(data).abilities,
          id: data.id,
          type: this.getType(data),
        });

        return data.id;
      });
  };

  evolutionPokemonList () {
    return GetPokemonInfoEvol(this.state.evolution)
      .then(pokemonsList => {
        this.setState({
          evolutionList: [pokemonsList],
        });

      });
  }

  evolution (elem) {
    return GetEvolution(elem.url)
    .then(data => {
      console.log(data);
      this.setState({
        evolution: data,
      });
    });
  }

  getDiscriptionPokemon () {
    return this.pokemonInfo(`/pokemon-species/${this.props.match.params.name}/`)
      .then(data => {
        let discriptionList = data.flavor_text_entries.map(({ flavor_text, language, version }) => {
          return {text: flavor_text, language: language.name, version: version.name, };
        });
        let sortList = discriptionList.filter((elem) => {
          return elem.language == 'en';
        });
        let category = data.genera[2].genus;
        this.setState({
          discription: sortList,
          discriptionText: sortList[0].text,
          category: category,
        });
        // console.log(sortList);
        return {
          sortList: sortList,
          url: data.evolution_chain.url,
        }
      });
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



  getPokemonsList(pokemonIndex) {
    return this.pokemonInfo('/pokemon-species/')
      .then(data => {
        const pokemonsLength = data.results.length;
        const prevId = pokemonIndex < 2 ? pokemonsLength - 1 : pokemonIndex - 2;
        const nextId = pokemonIndex >= pokemonsLength ? 0 : pokemonIndex;
        this.setState({
          pokemonPrevios: {
            id: prevId,
            name: data.results[prevId].name,
          },
          pokemonNext: {
            id: nextId,
            name: data.results[nextId].name,
          },
        });

      });
  };

  getAtributes (data) {
    let atribValue = data.stats.map(({ base_stat, stat }) => {
      return {key: stat.name, value: base_stat};
    });
    return atribValue.reverse();
  }

  getOptions (data) {
    let weight = ((data.weight / 10) * 2.2046).toFixed(1);
    let abilities = data.abilities.map((elem) => {
      return elem.ability.name;
    })
    return {
      weight: weight,
      abilities: abilities[0],
    }
  }

  getType (data) {
    const typesList = data.types.map((type, index) => {
      return <Type key={index} name={type.type.name} />
    });
    return typesList;
  }

  render() {
    let option = {
      height: this.state.height,
      weight: this.state.weight,
      abilities: this.state.abilities,
      category: this.state.category,
    };

    let previousPokemon = this.state.pokemonPrevios;
    let nextPokemon = this.state.pokemonNext;

    let infoList = this.state.info;
    // console.log(infoList);

    let evolution = this.state.evolutionList;
    console.log(evolution);


    const infoType = this.state.type;

    const version = this.state.discription.map((elem, index) => {

      return <option key={index} value={index}>{elem.version}</option>;
    })

    const infoAtribute = this.state.stats.reduce((acum, {key, value}) => {
      const max = 200;
      const correctValue = 100 - value * 100 / max;
      acum.sumOfValue += value

      acum.markup.push( <div key={key} className="first">
                          <div className="inside">
                            <div className="inside-white" style={{height: `${correctValue}%`}}></div>
                          </div>
                          <span>{key}</span>
                        </div>)

      return acum;
    }, { sumOfValue: 0, markup: [], });
    let validPreviousIndex = previousPokemon.id + 1;
    let validNextIndex = nextPokemon.id + 1;

    let pokemonIndex = (infoList.id < 10) ? '00' + infoList.id :
                    (infoList.id < 100) ? '0' + infoList.id : infoList.id;

    let indexPreviousPokemon = (validPreviousIndex < 10) ? '00' + validPreviousIndex :
                    (validPreviousIndex < 100) ? '0' + validPreviousIndex : validPreviousIndex;
    let indexNextPokemon = (validNextIndex < 10) ? '00' + validNextIndex :
                    (validNextIndex < 100) ? '0' + validNextIndex : validNextIndex;


    let finalEvol = evolution.map((elem, index, evolution) => {
      console.log(evolution);
      // let onlyFirstLevel = evolution.filter((elem) => {
      //   return elem.level == '1';
      // });
      let onlySecondLevel = evolution.filter((elem) => {
        return elem.level == '2';
      });
      let onlyThirdLevel = evolution.filter((elem) => {
        return elem.level == '3';
      });
      // // console.log(onlyThirdLevel);
      // // if (onlySecondLevel.length > 3 && onlyThirdLevel.length == 0) {
      // //   return (
      // //     <div className={'level' + elem.level} key={index}>
      // //       <Link to={`/pokemon/${elem.name}/`}>
      // //         <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${index + 1}.png`} className="imgFooter" alt="pokemon"></img>
      // //         <h3>{elem.name}</h3>
      // //       </Link>
      // //       <ul>
      // //         <li></li>
      // //       </ul>
      // //       {/* <span></span> */}
      // //     </div>
      // //   );
      // // })
      // }
      return (
        <div className={'level' + elem.level} key={index}>
          <Link to={`/pokemon/${elem.name}/`}>
            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${index + 1}.png`} className="imgFooter" alt="pokemon"></img>
            <h3>{elem.name}</h3>
          </Link>
          <ul>
            <li></li>
          </ul>
          {/* <span></span> */}
        </div>
      );
    })

    return (
      <div className="wraper">
        <div className="container pokedex">
          <div className="header">
            <div className="pokedex-pokemon-pagination">

              <Link to={`/pokemon/${previousPokemon.name}/`} className="previous">
                <div className="pokedex-pokemon-pagination-wrapper">
                  <span className="icon icon_arrow_sm_left"></span>
                  <span className="pokemon-number">#{indexPreviousPokemon}</span>
                  <span className="pokemon-name" id="pokemon-name">{previousPokemon.name}</span>
                </div>
              </Link>
              <Link to={`/pokemon/${nextPokemon.name}/`} className="next">
                <div className="pokedex-pokemon-pagination-wrapper">
                  <span className="icon icon_arrow_sm_right"></span>
                  <span className="pokemon-number">#{indexNextPokemon}</span>
                  <span className="pokemon-name" id="pokemon-name">{nextPokemon.name}</span>
                </div>
              </Link>
            </div>

            <div className="pokedex-pokemon-pagination-title">
              <div className="title-text">
                <span>{infoList.name}</span>
                <span>#{pokemonIndex}</span>
              </div>
            </div>

          </div>

          <div className="section pokedex-pokemon-details">

            <div className="left-content">
              <div className="avatar">
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonIndex}.png`} className="imgFront" alt="pokemon"></img>
              </div>

              <div className="collectibles-wrapper">

                <div className="collectibles-collection">
                  <a href="#" title="Add to My Collection">
                    <span className="icon icon_collection"></span>
                  </a>
                </div>

                <div className="collectibles-wishlist">
                  <a href="#" title="Add to My Wish List">
                    <span className="icon icon_wishlist"></span>
                  </a>
                </div>

                <div className="collectibles-trade">
                  <a href="#" title="Add to My Trade List">
                    <span className="icon icon_trade"></span>
                  </a>
                </div>

                <div className="collectibles-plus">
                  <a href="#" title="Add to favorites!">
                    <span className="icon icon_add"></span>
                  </a>
                </div>

              </div>

              <div className="pokemon-stats-info">
                <span className="sumAtribute">Sum of all attributes : {this.state.stats.length ? (infoAtribute.sumOfValue / this.state.stats.length).toFixed(0) : 0}</span>
                {infoAtribute.markup}
              </div>
            </div>

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
                  {infoType}
                </div>
                <div className="weaknesses">
                  <div className="weaknesses-text">
                    <h3>Weaknesses</h3>
                  </div>
                  {infoType}
                </div>
              </div>
            </div>
          </div>

          <div className="pokemon-evolution">
            <h2>Evolutions</h2>
            <div className="evolution-profile">
              {finalEvol}
              {/* <span></span> */}
            </div>
          </div>

        </div>
      </div>
    );
  }
  }

export default PokemonInside;