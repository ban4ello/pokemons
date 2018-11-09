const getInitialState = () => {
  return {loading: false, currentIndex: 0, error: null, allPokemons: []};
}

const pokemonsList = (state = getInitialState(), action) => {
  const allPokemonsClone = state.allPokemons.slice(0);

  switch (action.type) {
    case 'GET_POKEMONS':
      return Object.assign({}, state, {loading: true});

    case 'GET_POKEMONS_SUCCESS':
      action.payload.data.forEach((pokemon) => {
        updatePokemon(allPokemonsClone, pokemon);
      })

      return Object.assign({}, state, {
        currentIndex: action.payload.to,
        loading: false,
        allPokemons: allPokemonsClone
      });

    case 'GET_POKEMONS_ERROR':
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });

    case 'GET_ADDITIONAL_INFO':
      updatePokemon(allPokemonsClone, action.payload.data);

      return Object.assign({}, state, {
        allPokemons: allPokemonsClone
      });
    case 'GET_EVOLUTION_INFO':
      action.payload.data.forEach((pokemon) => {
        updatePokemon(allPokemonsClone, pokemon);
      })

      return Object.assign({}, state, {
        allPokemons: allPokemonsClone,
        // test: action.payload.data,
      });

    case 'GET_ALLPOKEMON':
      return Object.assign({}, state, {
        allPokemons: [
          ...state.allPokemons,
          ...action.payload.data
        ]
      });

    default:
      return state;
  }
};

export default pokemonsList;

const updatePokemon = (pokemons, newPokemon) => {
  const pokemon = pokemons.find(({name}) => name === newPokemon.name);

  if (pokemon) {
    Object.assign(pokemon, newPokemon);
  }

  return pokemons;
}

// function actionFunction (data) {
//   return { type: 'a', payload: data};
// }
// const component = {props: {}, stata: {}}
// function getStateFun (state) {
//   return {
//     pokemons: state.pokemons,
//   }
// }
// connect({action})(component)
//
// function connect (getStateFun, actionsArr) {
//   return (component) => {
//     const funForSubscr = () => {
//       component.props = {...component.props, ...getStateFun(this.store.state)};
//     }
//
//     this.store.subscribe(funForSubscr)
//
//     funForSubscr();
//     actionsArr.forEach(action => {
//      component.props[action.name] = () => this.store.dispatch(action);
//    })
//   }
// }
//
