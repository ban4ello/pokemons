import { getPokemons } from '../components/fetch.js';

export const getPokemonsAction = () => {
  return {
    type: 'GET_POKEMONS',
  }
}

export const getAdditionalAction = (data) => {
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
      name: data.name,
    };

  return {
    type: 'GET_ADDITIONAL_INFO',
    payload: {data: newData, },
  }
}
export const getEvolutionAction = (data) => {
  // console.log(data);
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
    type: 'GET_EVOLUTION_INFO',
    payload: { data: newData },
  }
}
export const getAllPokemon = (data) => {

    const list = data.results.slice(0, 802).map(({name}, index) => {
      const ind = (index < 10) ? '00' + (index + 1) :
                      (index < 100) ? '0' + (index + 1) : (index + 1);
      return {
        name,
        index: ind,
      }
    })

  return {
    type: 'GET_ALLPOKEMON',
    payload: {data: list, },
  }
}

export const pokemonsSuccessAction = ({ data, to }) => {
  // console.log(data);

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
