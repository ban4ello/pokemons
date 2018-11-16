const getInitialState = () => {
  return {loading: false, showLoader: true, currentIndex: 0, error: null, allPokemons: []};
};

const pokemonsList = (state = getInitialState(), action) => {
  const allPokemonsClone = state.allPokemons.slice(0);

  switch (action.type) {
  case 'GET_POKEMONS':
    return Object.assign({}, state, {loading: true, showLoader: true});

  case 'GET_POKEMONS_SUCCESS':
    action.payload.data.forEach((pokemon) => {
      updatePokemon(allPokemonsClone, pokemon);
    });

    return Object.assign({}, state, {
      currentIndex: action.payload.to,
      loading: false,
      allPokemons: allPokemonsClone,
      showLoader: false,
    });

  case 'GET_POKEMONS_ERROR':
    return Object.assign({}, state, {
      error: action.payload,
      loading: false,
    });

  case 'GET_ADDITIONAL_INFO':
    updatePokemon(allPokemonsClone, action.payload.data);

    return Object.assign({}, state, {
      allPokemons: allPokemonsClone,
      showLoader: false,
    });
  case 'GET_EVOLUTION_INFO':
    action.payload.data.forEach((pokemon) => {
      updatePokemon(allPokemonsClone, pokemon);
    });

    return Object.assign({}, state, {
      allPokemons: allPokemonsClone,
    });

  case 'GET_ALLPOKEMON':
    return Object.assign({}, state, {
      allPokemons: [
        ...state.allPokemons,
        ...action.payload.data,
      ],
    });

  default:
    return state;
  }
};

export default pokemonsList;

const updatePokemon = (pokemons, newPokemon) => {
  const pokemon = pokemons.find(({ id, name }) => id === newPokemon.id || name === newPokemon.name);
  if (pokemon) {
    Object.assign(pokemon, newPokemon);
  }

  return pokemons;
};
