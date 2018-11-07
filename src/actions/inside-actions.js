import {getPokemon, getPokemonSpecies, getPokemonSpeciesByName, getEvolution, getPokemonInfoEvol, } from './components/fetch.js';

export const getInsidePokemonsActionCreator = (name) => (dispatch) => {
      dispatch({
         type: 'GET_POKEMONS_INSIDE',
       });

       return getPokemon(name)
        .then((data) => {
          dispatch({
            type: 'GET_POKEMONS_INSIDE_SUCCESS',
            payload: data,
          });
        })
        .catch(err => {
          dispatch({
            type: 'GET_POKEMONS_INSIDE_ERROR',
            payload: err,
          });
        })
     }

export const getPokemonInsideAction = () => {
  return {
    type: 'GET_INSIDE_POKEMONS',
  }
}

export const insidePokemonsSuccessAction = ({ name }) => {
  return {
    type: 'GET_POKEMONS_INSIDE_SUCCESS',
    payload: {name},
  }
}

export const getPokemonInsideErrorAction = (err) => {
  return {
    type: 'GET_POKEMONS_INSIDE_ERROR',
    payload: err,
  }
}
