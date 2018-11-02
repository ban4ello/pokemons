import {GetPokemons, GetPokemon} from '../get-pokemons.js';

export const getPokemonsActionCreator = (from, to) => (dispatch) => {
      dispatch({
         type: 'GET_POKEMONS',
       });

       return GetPokemons(from, to)
        .then((data) => {
          dispatch({
            type: 'GET_POKEMONS_SUCCESS',
            payload: {data, to},
          });
        })
        .catch(err => {
          dispatch({
            type: 'GET_POKEMONS_ERROR',
            payload: err,
          });
        })
     }

export const getPokemonsAction = () => {
  return {
    type: 'GET_POKEMONS',
  }
}
export const pokemonsSuccessAction = ({ data, to }) => {
  return {
    type: 'GET_POKEMONS_SUCCESS',
    payload: {data, to},
  }
}
export const getPokemonsErrorAction = (err) => {
  return {
    type: 'GET_POKEMONS_ERROR',
    payload: err,
  }
}
