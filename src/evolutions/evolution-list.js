import {GetEvolution, GetPokemonInfoEvol} from './get-evolution.js';

export const evolutionPokemonList = (data) => {
  return GetPokemonInfoEvol(data)
    .then(pokemonsList => {
      this.setState({
        evolutionList: pokemonsList,
      });
    });
}

export const evolution = (elem) => {
  return GetEvolution(elem.url)
  .then(data => {
    this.evolutionPokemonList(data);
    this.setState({
      evolution: data,
    });
  });
}
