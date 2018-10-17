import { combineReducers } from 'redux';
import pokemonsList from './pokemonsList';
// import {GetPokemons, GetPokemon} from '../get-pokemons.js';

const allReducers = combineReducers({
  pokemonsList,
});

export default allReducers;
