export function pokemonInfo (endpoint) {
  return fetch(`https://pokeapi.co/api/v2${endpoint}`).then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);

        return;
      }

      return response.json().then(function (data) {
        return data;
      });
    }
  )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

export function evolutionInfo (url) {
  return fetch(url).then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);

        return;
      }

      return response.json().then(function (data) {
        return data;
      });
    }
  )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

export const getEvolution = (url) => {
  return evolutionInfo(url)
    .then(data => {
      const arrayEvolution = [];
      let current = 1;

      const getNameEvol = (info) => {
        if (info.length !== 0) {
          current += 1;
          info.map(({evolves_to, species}) => {
            arrayEvolution.push({ name: species.name, level: `${current}` }, );

            if (evolves_to.length !== 0) {
              getNameEvol(evolves_to);
            }
          });
        }
      };
      arrayEvolution.push({ name: data.chain.species.name, level: `${current}` }, );
      getNameEvol(data.chain.evolves_to);

      return arrayEvolution;
    });
};

export function getPokemonInfoEvol (data, currentPokemonName) {
  const pokemonsPromises = Array.from(data).map((elem) => {
    if (elem.name !== currentPokemonName) {
      return getPokemon(elem.name);
    }

    return { name: currentPokemonName, level: elem.level };
  });

  return Promise.all(pokemonsPromises)
    .then((pokemonsList) => {
      return pokemonsList;
    }
    );
}

export function getPokemon (name) {
  const pokemonsWithForms = {
    'minior': 'minior-red-meteor',
    'mimikyu': 'mimikyu-disguised',
    'deoxys': 'deoxys-normal',
    'wormadam': 'wormadam-plant',
    'giratina': 'giratina-altered',
    'shaymin': 'shaymin-land',
    'basculin': 'basculin-red-striped',
    'darmanitan': 'darmanitan-standard',
    'tornadus': 'tornadus-incarnate',
    'thundurus': 'thundurus-incarnate',
    'landorus': 'landorus-incarnate',
    'keldeo': 'keldeo-ordinary',
    'meloetta': 'meloetta-aria',
    'meowstic': 'meowstic-male',
    'aegislash': 'aegislash-shield',
    'pumpkaboo': 'pumpkaboo-average',
    'gourgeist': 'gourgeist-average',
    'oricorio': 'oricorio-baile',
    'lycanroc': 'lycanroc-midday',
    'wishiwashi': 'wishiwashi-solo',
  };

  name = pokemonsWithForms[name] ? pokemonsWithForms[name] : name;

  return pokemonInfo(`/pokemon/${name}/`);
}

export function getPokemonSpeciesByName (name) {
  return pokemonInfo(`/pokemon-species/${name}/`);
}
export function getListAllPokemon () {
  return pokemonInfo('/pokemon-species/');
}


export function getPokemons (from, to) {
  const pokemonsPromises = Array.from(new Array(to - from + 1)).map((elem, index) => getPokemon(index + from));

  return Promise.all(pokemonsPromises).then(
    (pokemonsList) => {
      return pokemonsList;
    }
  );
}
