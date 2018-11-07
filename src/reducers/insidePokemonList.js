const getInitialState = () => {
  return {
    discription: [],
    info: [],
    stats: [],
    pokemonPrevios: {},
    pokemonNext: {},
    discriptionText: '',
    height: '',
    weight: '',
    category: '',
    abilities: '',
    evolution: [],
    evolutionList: [],
    id: '',
  };
}

const pokemonsList = (state = getInitialState(), action) => {
       switch (action.type) {
         // case 'GET_POKEMONS_INSIDE':
         //  return Object.assign({}, state);

         case 'GET_ADDITIONAL_INFO':
           return Object.assign({}, state, {
             pokemons: [...state.pokemons, ...action.payload.additInfo],
           });

         // case 'GET_POKEMONS_INSIDE_ERROR':
         //   return Object.assign({}, state, {
         //     error: action.payload,
         //     // loading: false,
         //   });

         default:
           return state;
       }
     };

export default pokemonsList;


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
