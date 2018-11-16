
export const getPokemonsAction = () => {
  return {
    type: 'GET_POKEMONS',
  };
};

export const getAdditionalAction = (data) => {
  let descriptionList = data.flavor_text_entries.map(({ flavor_text, language, version }) => {
    return {text: flavor_text, language: language.name, version: version.name };
  });
  let sortList = descriptionList.filter((elem) => {
    return elem.language === 'en';
  });
  const newData = {
    descriptionList: sortList,
    category: data.genera[2].genus,
    url: data.evolution_chain.url,
    id: data.id,
  };

  return {
    type: 'GET_ADDITIONAL_INFO',
    payload: {data: newData },
  };
};
export const getEvolutionAction = (data) => {
  const newData = data.map((item) => {
    return {
      name: item.name,
      evolution: data,
    };
  });

  return {
    type: 'GET_EVOLUTION_INFO',
    payload: { data: newData },
  };
};
export const getPokemonAction = (pokemon) => {
  let index = 0;

  if (pokemon.id < 10) {
    index = '00' + pokemon.id;
  } else {
    index = (pokemon.id < 100) ? '0' + pokemon.id : pokemon.id;
  }

  const newData = {
    abilities: pokemon.abilities,
    height: pokemon.height,
    id: pokemon.id,
    index: index,
    stats: pokemon.stats,
    types: pokemon.types,
    weight: pokemon.weight,
  };

  return {
    type: 'GET_ADDITIONAL_INFO',
    payload: { data: newData },
  };
};
export const getAllPokemon = (data) => {
  const list = data.results.slice(0, 802).map(({name}, i) => {
    let index = 0;

    if (i < 10) {
      index = '00' + (i + 1);
    } else {
      index = (i < 100) ? '0' + (i + 1) : (i + 1);
    }

    return {
      id: i + 1,
      name,
      index: index,
    };
  });

  return {
    type: 'GET_ALLPOKEMON',
    payload: {data: list },
  };
};

export const pokemonsSuccessAction = ({ data, to }) => {
  const newData = data.map((item) => {
    let index = 0;
    if (item.id < 10) {
      index = '00' + item.id;
    } else {
      index = (item.id < 100) ? '0' + item.id : item.id;
    }

    return {
      abilities: item.abilities,
      height: item.height,
      id: item.id,
      index: index,
      name: item.name,
      stats: item.stats,
      types: item.types,
      weight: item.weight,
    };
  });

  return {
    type: 'GET_POKEMONS_SUCCESS',
    payload: {data: newData, to},
  };
};
export const getPokemonsErrorAction = (err) => {
  return {
    type: 'GET_POKEMONS_ERROR',
    payload: err,
  };
};
