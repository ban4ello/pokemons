import React, { Component } from 'react';
import '../style/leftContent.scss';
import Stats from './stats_info.js';
import PropTypes from 'prop-types';

export default class LeftContent extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let arrayIconName = [ 'Collection', 'Wishlist', 'Trade', 'Add' ];
    const icon = arrayIconName.map((item, index) => {
      return (
        <div className={`collectibles-${item}`} key={index}>
          <a href="#" title={`Add to My ${item}`}>
            <span className={`icon icon_${item.toLowerCase()}`}></span>
          </a>
        </div>
      );
    });

    return (
      <div className="left-content">
        <div className="avatar">
          <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.props.index}.png`} className="imgFront" alt="pokemon"></img>
        </div>

        <div className="collectibles-wrapper">
          {icon}
        </div>
        <Stats statsInfo={this.props.statsInfo} />
      </div>

    );
  }
}

LeftContent.propTypes = {
  index : PropTypes.string,
  statsInfo: PropTypes.array,
};
