import {GetPokemons, GetPokemon} from './get-pokemons.js';

     const createStore = (reducer, initialState) => {
       const store = {};
       store.state = initialState;
       store.listeners = [];
       store.getState = () => store.state;
       store.subscribe = listener => {
         store.listeners.push(listener);

         if (initialState) {
           listener();
         }
       };
       store.dispatch = action => {
         if (initialState) {
           initialState = false;
         }

         store.state = reducer(store.state, action);
         store.listeners.forEach(listener => listener());
       };

       return store;
     };

     const getInitialState = () => {
       return {
         loading: false,
         pokemons: [],
         currentIndex: 0,
         error: null,
       };
     };

     const reducerFun = (state = getInitialState(), action) => {
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
     const store = createStore(reducerFun, getInitialState());

     export function getPokemonsActionCreator (store, from, to) {
       store.dispatch({
         type: 'GET_POKEMONS',
       });

       return GetPokemons(from, to)
        .then((data) => {
          store.dispatch({
            type: 'GET_POKEMONS_SUCCESS',
            payload: {data, to},
          });
        })
        .catch(err => {
          store.dispatch({
            type: 'GET_POKEMONS_ERROR',
            payload: err,
          });
        })
     }

     export default store;
