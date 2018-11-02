const getInitialState = () => {
  return {
   loading: false,
   pokemons: [],
   currentIndex: 0,
   error: null,
  };
}

const pokemonsList = (state = getInitialState(), action) => {
       switch (action.type) {
         case 'GET_POKEMONS':
          return Object.assign({}, state, {
            loading: true,
          });

         case 'GET_POKEMONS_SUCCESS':
           return Object.assign({}, state, {
             pokemons: [...state.pokemons, ...action.payload.data],
             currentIndex: action.payload.to,
             loading: false,
           });

         case 'GET_POKEMONS_ERROR':
           return Object.assign({}, state, {
             error: action.payload,
             loading: false,
           });

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
