import Type from '../type.js';
import React, { Component } from 'react'
import  '../style/evolution.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPokemonsAction, pokemonsSuccessAction, getAdditionalAction, getAllPokemon, getEvolutionAction, } from "../actions/create-actions";

class Evolution extends Component {
  constructor (props) {
    super(props);
    this.state = {
      level: {},
     };
  };
  getType (types) {
    const typesList = types.map((type, index) => {
      return <Type key={index} name={type.type.name} />
    });
    return typesList;
  }
  render() {

    if (!this.props.evolutions || Object.keys(this.props.evolutions).length === 0) return  <div>Loading ...</div>

    // console.log(this.props.allPokemons);
    // console.log(this.props.data);
    //
    let onlyFirstLevel = this.props.evolutions.filter(({level}) => {
      return level == '1';
    });
    let onlySecondLevel = this.props.evolutions.filter(({level}) => {
      return level == '2';
    });
    let onlyThirdLevel = this.props.evolutions.filter(({level}) => {
      return level == '3';
    });

    let claz  = '';

    if (this.props.evolutions.length == 1) {
      claz = 'onePokemon homeless';
    }
     else if (onlySecondLevel.length == 1 && onlyThirdLevel.length == 0) {
      claz = 'onlyTwoPokemon';
    }
      else if (onlySecondLevel.length > 2 && onlyThirdLevel.length == 0) {
      claz = 'eevee blok';
    }
      else if (onlySecondLevel.length == 2) {
      claz = 'onlyTwoLevel2';
    }
      else {
      claz = 'threeEvol';
    }

    const evolutions = this.props.evolutions.map((evolution) => {
      // console.log(evolution);
      const pokemon = this.props.allPokemons.find(({name}) => name === evolution.name);


      // console.log(pokemon);
      return (
          <div className={claz} key={pokemon.id}>
            {this.props.evolutions.length === 1 ? <p>This Pokémon does not evolve.</p> : ''}
            <div className={'level' + evolution.level}>
              <Link to={`/pokemon/${pokemon.name}/`}>
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.index}.png`} className="imgFooter" alt="pokemon"></img>
                <h3>{pokemon.name}<span> #{pokemon.index}</span></h3>
                {this.getType(pokemon.types)}
              </Link>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        );
    })

    // let finalEvol = this.props.data.evolution.map((elem, index, evolution) => {

    //
    //   if (onlySecondLevel.length == 2) {
    //     console.log('ok');
    //     return (
    //       <div key={index} className={'onlyTwoLevel2'}>
    //           <div className={'level' + elem.level}>
    //             <Link to={`/pokemon/${elem.name}/`}>
    //               <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${indexEvol[index]}.png`} className="imgFooter" alt="pokemon"></img>
    //               <h3>{elem.name}<span> #{indexEvol[index]}</span></h3>
    //               {type[index]}
    //             </Link>
    //             <ul>
    //               <li></li>
    //             </ul>
    //           </div>
    //       </div>
    //     );
    //   }
    //   return (
    //     <div className={'threeEvol'} key={index}>
    //       <div className={'level' + elem.level}>
    //         <Link to={`/pokemon/${elem.name}/`}>
    //           <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${indexEvol[index]}.png`} className="imgFooter" alt="pokemon"></img>
    //           <h3>{elem.name}<span> #{indexEvol[index]}</span></h3>
    //           {type[index]}
    //         </Link>
    //         <ul>
    //           <li></li>
    //         </ul>
    //       </div>
    //     </div>
    //   );
    // })

    return (
      <div className="pokemon-evolution">
        <h2>Evolutions</h2>
        <div className="evolution-profile">
          {evolutions}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    // console.log(state);
    const { pokemonsList } = state;

    return {

      allPokemons: pokemonsList.allPokemons,
    };
  },
  {getPokemonsAction  }
)(Evolution);
