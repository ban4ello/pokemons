import React, { Component } from 'react';
import  './style/main.scss';
import  './style/font-awesome.min.css';
import  './style/icon-font.css';
import Type from './type.js';
import {GetPokemons, GetPokemon} from './get-pokemons.js';
// import PokemonInside from './pokemonInside.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const someText = document.getElementById('someText');

     const CreateStore = (reducer, initialState) => {
       const store = {};
       store.state = initialState;
       store.listeners = [];
       store.getState = () => store.state;
       store.subscribe = listener => {
         store.listeners.push(listener);
       };
       store.dispatch = action => {
         // console.log('> Action', action);
         store.state = reducer(store.state, action);
         store.listeners.forEach(listener => listener());
       };
       return store;
     };

     const getInitialState = () => {
       return {
         loading: false,
         step: 12,
         currentIndex: 0,
         pokemons: [],
         showBtn: true,
         count: 10,
       };
     };
     const reducer = (state = getInitialState(), action) => {
       switch (action.type) {
         case 'FETCH':
         console.log(GetPokemons(action.count, action.to).then(value => value));
           const nextState = {
             count: state.count + action.payload.count,
           };
           return nextState;

         default:
           return state;
       }
     };
     const store = CreateStore(reducer);
     store.subscribe(() => {
       const state = store.getState();
       someText.innerHTML = state.count;
     });

     document.addEventListener('click', () => {
       // console.log('----- Previous state', store.getState());
       store.dispatch({
         type: 'FETCH',
         payload: {
           count: 1,
           // count: Math.ceil(Math.random() * 10),
           to: 10,
         },
       });
       // console.log('+++++ New state', store.getState());
     });
     store.dispatch({}); // Sets the inital state

export default store;
