export function pokemonInfo(endpoint) {
  return fetch(`https://pokeapi.co/api/v2${endpoint}`).then(
    function(response) {
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

export function getPokemon(name) {
  return pokemonInfo(`/pokemon/${name}/`);
}

export function getPokemonSpecies() {
  return pokemonInfo('/pokemon-species/');
}
export function getPokemonSpeciesByName(name) {
  return pokemonInfo(`/pokemon-species/${name}/`);
}

export function getPokemons (from, to) {
  const pokemonsPromises = Array.from(new Array(to - from + 1)).map((elem, index) => getPokemon(index + from));

  return Promise.all(pokemonsPromises).then(
    (pokemonsList) => {
      return pokemonsList;
    }
  ).catch(err => {});
}
