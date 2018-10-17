import React, { Component } from 'react';

class Type extends Component {
  constructor (props) {
    super(props);
    // this.state = {pokemon: {}};
  };

  render() {
    const typeName = this.props.name;

    return (
      <div className="pokemon">
        <div>{typeName}</div>
      </div>
    );
  }
}


export default Type;
