import {GetPokemon} from '../get-pokemons.js';

function EvolutionInfo(url) {

  return fetch(url).then(
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

const GetEvolution = (url) => {
  return EvolutionInfo(url)
    .then(data => {
      // console.log(data);
      const arrayEvolution = [];
      let current = 1;

      const getNameEvol = (info) => {
        if (info.length !== 0) {
          current += 1;
          info.map(({evolves_to, species}, index) => {
            arrayEvolution.push({ name: species.name, level: `${current}`, }, );

            if (evolves_to.length !== 0) {
               getNameEvol(evolves_to);
            }
          })
        }

      }
      arrayEvolution.push({ name: data.chain.species.name, level: `${current}`, }, );
      getNameEvol(data.chain.evolves_to);
      // console.log(arrayEvolution);
      return arrayEvolution;
    });
};

function GetPokemonInfoEvol (array) {
  const pokemonsPromises = Array.from(array).map((elem, index) => GetPokemon(elem.name));

  return Promise.all(pokemonsPromises).then(
    (pokemonsList) => {
      return pokemonsList;
    }
  ).catch(err => {});
}

export {GetEvolution as GetEvolution, GetPokemonInfoEvol as GetPokemonInfoEvol};
