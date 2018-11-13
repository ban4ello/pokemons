import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  './style/insidePokemon.scss';
// import Pokemon from './pokemon.js';
import Type from './type.js';
// import {GetPokemon} from './get-pokemons.js';
import {getPokemon, getListAllPokemon, getPokemonSpecies, getPokemonSpeciesByName, getEvolution, getPokemonInfoEvol, } from './components/fetch.js';
// import { pokemonsInsideAction, getPokemonInsideAction, insidePokemonsSuccessAction } from "./actions/create-actions";
import PreviousAndNextPokemon from './components/previousAndNextPokemon.js';
import Stats from './components/stats_info.js';
import Discription from './components/discription.js';
import Evolution from './components/evolution.js';
import { connect } from "react-redux";
import { getPokemonsAction, getPokemonAction, getAdditionalAction, getAllPokemon, getEvolutionAction, } from "./actions/create-actions";

class PokemonInside extends Component {
  constructor (props) {
    super(props);
    // console.log(props);
    this.state = {
      // discription: [],
      // info: [],
      // stats: [],
      pokemon: {},
      pokemonPrevios: {},
      pokemonNext: {},
      // discriptionText: '',
      // discriptionList: [],
      // height: '',
      // weight: '',
      // category: '',
      // abilities: { ability: {} },
      // evolution: [],
      // evolutionList: [],
      // id: '',
     };
  };

  componentDidMount() {
    // this.pokemonsList();

    if (this.props.allPokemons.length === 0) {
      getListAllPokemon()
      .then( data => {
        this.props.getAllPokemon(data)
        this.fetchAllData();
      })
    }

    if (this.props.currentIndex !== 0) {
      this.fetchAllData();
    }
  };

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.fetchAllData();
    }
  };

  fetchAllData () {
    const pokemon = this.getPokemonFromList();

    if (pokemon) {
      //
      // if (pokemon.discriptionList) {
      //   this.updateStateDescription(pokemon);
      // }
      // // console.log(pokemon.evolution);
      // if (pokemon.evolution) {
      //   this.updateStateEvolution(pokemon);
      // }

      if (!pokemon.discriptionList) {
        this.getDiscriptionPokemon().then((data) => {
          // this.updateStateDescription(data);

          if (!pokemon.evolution) {
            console.log(111);
            this.evolution(data);
            this.updatePokemon(pokemon);
          }
        });
      }

      this.updatePokemon(pokemon);
    }
    else {
      getPokemon(this.props.match.params.name)
        .then(data => {
          // console.log(data);
          this.props.getPokemonAction(data);


          this.getDiscriptionPokemon().then((data) => {
            // this.updateStateDescription(data);
            this.evolution(data);

            const pokemon = this.getPokemonFromList();

            this.updatePokemon(pokemon);

            // console.log(data);

            // if (!pokemon.evolution) {
              // this.evolution(data);
            // }
          });

          return data.id;
        });
    }
  };

  getPokemonFromList() {
    return this.props.allPokemons.find(({ id, name }) => id >= 0 && (name === this.props.match.params.name || id === +this.props.match.params.name));
  }

  updateStateEvolution(pokemon) {
    this.setState({
      evolution: pokemon.evolution,
      evolutionList: pokemon.evolutionList,
    });
  }

  updateStateDescription(data) {
    this.setState({
      discriptionList: data.discriptionList,
      category: data.category,
    });
  };

  updatePokemon (pokemon) {
    const pokemonsLength = this.props.allPokemons.length;
    const prevId = pokemon.id < 2 ? pokemonsLength - 1 : pokemon.id - 2;
    const nextId = pokemon.id >= pokemonsLength ? 0 : pokemon.id;
    // const currentPokemon = pokemon.id - 1;

    console.log(pokemon);
    this.setState({
      pokemon: pokemon,
      // stats: this.getAtributes(pokemon),
      // height: pokemon.height,
      // weight: this.getOptions(pokemon).weight,
      // abilities: pokemon.abilities[0],
      // id: pokemon.id,
      // type: this.getType(pokemon),
      pokemonPrevios: this.props.allPokemons[prevId],
      pokemonNext: this.props.allPokemons[nextId],
      // index: this.props.allPokemons[currentPokemon].index,
    });
  };

  getDiscriptionPokemon () {
    return getPokemonSpeciesByName(this.props.match.params.name)
      .then(data => {
        // console.log(data);
        return this.props.getAdditionalAction(data).payload.data;
      });
  };

  evolutionPokemonList (data) {
    return getPokemonInfoEvol(data, this.props.match.params.name)
      .then(pokemonsList => {
        console.log(pokemonsList);
        // console.log(1);
        pokemonsList.forEach(pokemon => {
          if (pokemon.id >= 0) {
            this.props.getPokemonAction(pokemon);
          }
        })
        this.props.getEvolutionAction(data);
        // console.log(2, this.props.allPokemons[0].evolution);
        this.setState({
          evolution: data,
          evolutionList: pokemonsList.map(pokemon => {
            if (pokemon.id >= 0) {
              return pokemon;
            }

            return this.props.allPokemons.find(({ id, name }) => id >= 0 && name === this.props.match.params.name);

          }),
        });
        return;
      });
  }

  evolution (elem) {
    return getEvolution(elem.url)
    .then(data => {
      this.evolutionPokemonList(data);
    });
  }

  // getAtributes (data) {
  //   let atribValue = data.stats.map(({ base_stat, stat }) => {
  //     return {key: stat.name, value: base_stat};
  //   });
  //   return atribValue.reverse();
  // }

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

    if (Object.keys(this.state.pokemon).length === 0) return  <div className="wraper">No pokemon</div>

    return (
      <div className="wraper">
        <div className="container pokedex">

          <PreviousAndNextPokemon
            pokemon={this.state.pokemon}
            pokemonPrevios={this.state.pokemonPrevios}
            pokemonNext={this.state.pokemonNext}
          />

          <div className="section pokedex-pokemon-details">

            <div className="left-content">
              <div className="avatar">
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.state.pokemon.index}.png`} className="imgFront" alt="pokemon"></img>
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

              <Stats statsInfo={this.state.pokemon.stats} />
            </div>

            <Discription pokemon={this.state.pokemon} />
          </div>

          <Evolution evolutions={ this.state.pokemon.evolution } />

        </div>
      </div>
    );
  }
  }

export default connect(
  (state) => {
    // console.log(state);
    const { pokemonsList } = state;

    return {
      allPokemons: pokemonsList.allPokemons,
      currentIndex: pokemonsList.currentIndex,
      // test: pokemonsList.test,
    };
  },
  { getAdditionalAction, getAllPokemon, getEvolutionAction, getPokemonAction }
)(PokemonInside);
