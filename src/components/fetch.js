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

export function evolutionInfo(url) {

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

export const getEvolution = (url) => {
  return evolutionInfo(url)
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

export function getPokemonInfoEvol (array) {
  const pokemonsPromises = Array.from(array).map((elem, index) => getPokemon(elem.name));

  return Promise.all(pokemonsPromises).then(
    (pokemonsList) => {
      return pokemonsList;
    }
  ).catch(err => {});
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
