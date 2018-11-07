import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  './style/insidePokemon.scss';
import Pokemon from './pokemon.js';
import Type from './type.js';
// import {GetPokemon} from './get-pokemons.js';
import {getPokemon, getPokemonSpecies, getPokemonSpeciesByName, getEvolution, getPokemonInfoEvol, } from './components/fetch.js';
import { pokemonsInsideAction, getPokemonInsideAction, insidePokemonsSuccessAction } from "./actions/create-actions";
import PreviousAndNextPokemon from './components/previousAndNextPokemon.js';
import Stats from './components/stats_info.js';
import Discription from './components/discription.js';
import Evolution from './components/evolution.js';
import { connect } from "react-redux";
import { getPokemonsAction, pokemonsSuccessAction, getAdditionalAction } from "./actions/create-actions";

class PokemonInside extends Component {
  constructor (props) {
    super(props);
    // console.log(props);
    this.state = {
      discription: [],
      info: [],
      stats: [],
      pokemonPrevios: {},
      pokemonNext: {},
      discriptionText: '',
      discriptionList: [],
      height: '',
      weight: '',
      category: '',
      abilities: { ability: {} },
      evolution: [],
      evolutionList: [],
      id: '',
     };
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
    const pokemon = this.props.pokemons.find(({ name }) => name === this.props.match.params.name);
    console.log(pokemon);
    console.log(this.props.additionData);

    if (pokemon) {
      this.basicData(pokemon);
      this.getPreviousAndNextPokemon(pokemon.id);
    }
    else {
      getPokemon(this.props.match.params.name)
        .then(data => {
          // console.log(data);

          this.basicData (data);

          this.getPreviousAndNextPokemon(data.id);

          return data.id;
        });
    }
    this.getDiscriptionPokemon().then((elem) => {
      this.evolution(elem);
    });

  };

  basicData (data) {

    this.setState({
      info: data,
      stats: this.getAtributes(data),
      height: data.height,
      weight: this.getOptions(data).weight,
      abilities: data.abilities[0],
      id: data.id,
      type: this.getType(data),
    });
  }

getAdditionData () {
  this.setState({
    category: this.props.additionData.category,
    discription: this.props.additionData.discriptionList,
    chainUrl: this.props.additionData.url,
  });
}

  evolutionPokemonList (data) {
    return getPokemonInfoEvol(data)
      .then(pokemonsList => {
        this.setState({
          evolutionList: pokemonsList,
        });
      });
  }

  evolution (elem) {
    return getEvolution(elem.url)
    .then(data => {
      this.evolutionPokemonList(data);
      this.setState({
        evolution: data,
      });
    });
  }

  getDiscriptionPokemon () {
    return getPokemonSpeciesByName(this.props.match.params.name)
      .then(data => {
        // console.log(data);
        this.props.getAdditionalAction(data);

        // let discriptionList = data.flavor_text_entries.map(({ flavor_text, language, version }) => {
        //   return {text: flavor_text, language: language.name, version: version.name, };
        // });
        // let sortList = discriptionList.filter((elem) => {
        //   return elem.language == 'en';
        // });
        // let category = data.genera[2].genus;
        // this.setState({
          // discription: sortList,
          // discriptionText: sortList[0].text,
          // category: category,
        // });

        return {
          // sortList: sortList,
          url: data.evolution_chain.url,
        }
      });
  };

  getPreviousAndNextPokemon(pokemonIndex) {
    return getPokemonSpecies()
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

    // console.log(this.state);

    const previosNextPokemon = {
      pokemonPrevios: this.state.pokemonPrevios,
      pokemonNext: this.state.pokemonNext,
      id: this.state.id,
      name: this.state.info.name,
    }

    let pokemonIndex = (this.state.info.id < 10) ? '00' + this.state.info.id :
                    (this.state.info.id < 100) ? '0' + this.state.info.id : this.state.info.id;

    return (
      <div className="wraper">
        <div className="container pokedex">

          <PreviousAndNextPokemon key={this.state.id} pokemon={previosNextPokemon} />

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

              <Stats key={this.props.match.params.name} statsInfo={this.state.stats} />
            </div>

            <Discription key={this.props.match.params.name} pokemonInfo={this.state} />
          </div>

          <Evolution key={this.props.match.params.name} evolutionInfo={this.state} />

        </div>
      </div>
    );
  }
  }

export default connect(
  (state) => {
    const { pokemonsList } = state;

    return {
      additionData: pokemonsList.additionData,
      pokemons: pokemonsList.pokemons,
    };
  },
  { getAdditionalAction }
)(PokemonInside);
