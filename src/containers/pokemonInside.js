import React, { Component } from 'react';
import '../style/insidePokemon.scss';
import Type from '../components/type.js';
import {getPokemon, getListAllPokemon, getPokemonSpeciesByName, getEvolution, getPokemonInfoEvol } from '../api/fetch.js';
import PreviousAndNextPokemon from '../components/previousAndNextPokemon.js';
import RightContent from '../components/rightContent.js';
import Evolution from '../components/evolution.js';
import LeftContent from '../components/leftContent.js';
import { connect } from 'react-redux';
import { getPokemonAction, getAdditionalAction, getAllPokemon, getEvolutionAction } from '../redux/actions/create-actions';
import PropTypes from 'prop-types';

class PokemonInside extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pokemon: {},
      pokemonPrevios: {},
      pokemonNext: {},
    };
  }

  componentDidMount () {
    if (this.props.allPokemons.length === 0) {
      getListAllPokemon()
        .then( data => {
          this.props.getAllPokemon(data);
          this.fetchAllData();
        });
    }

    if (this.props.currentIndex !== 0) {
      this.fetchAllData();
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.fetchAllData();
    }
  }

  fetchAllData () {
    const pokemon = this.getPokemonFromList();

    if (pokemon) {
      if (!pokemon.descriptionList) {
        this.getDiscriptionPokemon().then((data) => {
          if (!pokemon.evolution) {
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
          this.props.getPokemonAction(data);
          this.getDiscriptionPokemon().then((data) => {
            this.evolution(data);

            const pokemon = this.getPokemonFromList();
            this.updatePokemon(pokemon);
          });

          return data.id;
        });
    }
  }

  getPokemonFromList () {
    return this.props.allPokemons.find(({ id, name }) => id >= 0 && (name === this.props.match.params.name || id === +this.props.match.params.name));
  }

  updateStateEvolution (pokemon) {
    this.setState({
      evolution: pokemon.evolution,
      evolutionList: pokemon.evolutionList,
    });
  }

  updateStateDescription (data) {
    this.setState({
      descriptionList: data.descriptionList,
      category: data.category,
    });
  }

  updatePokemon (pokemon) {
    const pokemonsLength = this.props.allPokemons.length;
    const prevId = pokemon.id < 2 ? pokemonsLength - 1 : pokemon.id - 2;
    const nextId = pokemon.id >= pokemonsLength ? 0 : pokemon.id;

    this.setState({
      pokemon: pokemon,
      pokemonPrevios: this.props.allPokemons[prevId],
      pokemonNext: this.props.allPokemons[nextId],
    });
  }

  getDiscriptionPokemon () {
    return getPokemonSpeciesByName(this.props.match.params.name)
      .then(data => {
        // console.log(data);
        return this.props.getAdditionalAction(data).payload.data;
      });
  }

  evolutionPokemonList (data) {
    return getPokemonInfoEvol(data, this.props.match.params.name)
      .then(pokemonsList => {
        pokemonsList.forEach(pokemon => {
          if (pokemon.id >= 0) {
            this.props.getPokemonAction(pokemon);
          }
        });
        this.props.getEvolutionAction(data);
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

  getOptions (data) {
    let weight = ((data.weight / 10) * 2.2046).toFixed(1);
    let abilities = data.abilities.map((elem) => {
      return elem.ability.name;
    });

    return {
      weight: weight,
      abilities: abilities[0],
    };
  }

  getType (data) {
    const typesList = data.types.map((type, index) => {
      return <Type key={index} name={type.type.name} />;
    });

    return typesList;
  }

  render () {
    if (Object.keys(this.state.pokemon).length === 0) return <div className="loader"></div>;

    return (
      <div className="wraper">
        <div className="container pokedex">

          <PreviousAndNextPokemon
            pokemon={this.state.pokemon}
            pokemonPrevios={this.state.pokemonPrevios}
            pokemonNext={this.state.pokemonNext}
          />

          <div className="section pokedex-pokemon-details">
            <LeftContent index={this.state.pokemon.index} statsInfo={this.state.pokemon.stats}/>
            <RightContent pokemon={this.state.pokemon} />
          </div>

          <Evolution evolutions={ this.state.pokemon.evolution } />

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { pokemonsList } = state;

    return {
      allPokemons: pokemonsList.allPokemons,
      currentIndex: pokemonsList.currentIndex,
      showLoader: pokemonsList.showLoader,
    };
  },
  { getAdditionalAction, getAllPokemon, getEvolutionAction, getPokemonAction }
)(PokemonInside);

PokemonInside.propTypes = {
  allPokemons: PropTypes.array,
  getPokemonAction: PropTypes.func,
  getAllPokemon: PropTypes.func,
  getEvolutionAction: PropTypes.func,
  getAdditionalAction: PropTypes.func,
  currentIndex: PropTypes.number,
  match: PropTypes.object,
};
