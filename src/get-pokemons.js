// import React, { Component } from 'react';

function getPokemon(endpoint) {

  return fetch(`https://pokeapi.co/api/v2/${endpoint}/`).then(
    function(response) {
      // console.log(response);
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);

        return;
      }
      return response.json().then(function(data) {
        return data;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function getPokemons (from, to) {
  const pokemonsPromises = Array.from(new Array(to - from + 1)).map((elem, index) => getPokemon(`pokemon/${index + from}`));

  return Promise.all(pokemonsPromises).then(
    (pokemonsList) => {
      return pokemonsList;
    }
  ).catch(err => {});
}

export {getPokemons as GetPokemons, getPokemon as GetPokemon};
