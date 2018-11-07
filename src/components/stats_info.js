import React, { Component } from 'react'
import  '../style/stats.scss';

export default class Stats extends Component {
  constructor (props) {
    super(props);
  };


  render() {
    const infoAtribute = this.props.statsInfo.reduce((acum, {key, value}) => {
      const max = 200;
      const correctValue = 100 - value * 100 / max;
      acum.sumOfValue += value

      acum.markup.push( <div key={key} className="first">
                          <div className="inside">
                            <div className="inside-white" style={{height: `${correctValue}%`}}></div>
                          </div>
                          <span>{key}</span>
                        </div>)

      return acum;
    }, { sumOfValue: 0, markup: [], });
    return (
      <div key={this.props.stats} className="pokemon-stats-info">
        <span className="sumAtribute">Sum of all attributes : {this.props.statsInfo.length ? (infoAtribute.sumOfValue / this.props.statsInfo.length).toFixed(0) : 0}</span>
        {infoAtribute.markup}
      </div>
    )
  }
}
