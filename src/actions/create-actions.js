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

export const getAdditionalAction = (data) => {
  // console.log(data);
  
  let discriptionList = data.flavor_text_entries.map(({ flavor_text, language, version }) => {
    return {text: flavor_text, language: language.name, version: version.name, };
  });
  let sortList = discriptionList.filter((elem) => {
    return elem.language == 'en';
  });
  const newData = {
      discriptionList: sortList,
      category: data.genera[2].genus,
      url: data.evolution_chain.url,
    };

  return {
    type: 'GET_ADDITIONAL_INFO',
    payload: {data: newData, },
  }
}

export const pokemonsSuccessAction = ({ data, to }) => {

  const newData = data.map((item) => {
    const index = (item.id < 10) ? '00' + item.id :
                    (item.id < 100) ? '0' + item.id : item.id;

    return {
      abilities: item.abilities,
      height: item.height,
      id: item.id,
      index: index,
      name: item.name,
      stats: item.stats,
      types: item.types,
      weight: item.weight,
    }
  })
  return {
    type: 'GET_POKEMONS_SUCCESS',
    payload: {data: newData, to},
  }
}
export const getPokemonsErrorAction = (err) => {
  return {
    type: 'GET_POKEMONS_ERROR',
    payload: err,
  }
}
