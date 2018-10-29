import React, { Component } from 'react';

class Type extends Component {
  // constructor (props) {
  //   super(props);
  //   // this.state = {pokemon: {}};
  // };


  render() {
    const typeName = this.props.name;
    const colors = howColorType(typeName);
    return (
        <div className="type" style={{
          background: colors.colorType,
          color: colors.colorFont,
        }}>
          <p>{typeName}</p>
        </div>
    );
  }
}

function howColorType(typeName) {
  if (typeName === 'fire') {
    return {
      colorType: '#ff912e',
      colorFont: '#fff',
    };
  }
  if (typeName === 'grass') {
    return {
      colorType: '#9bcc50',
      colorFont: '#000',
    };
  }
  if (typeName === 'poison') {
    return {
      colorType: '#b97fc9',
      colorFont: '#fff',
    };
  }
  if (typeName === 'water') {
    return {
      colorType: '#4592c4',
      colorFont: '#fff',
    };
  }
  if (typeName === 'flying') {
    return {
      colorType: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)',
      colorFont: '#fff',
    };
  }
  if (typeName === 'bug') {
    return {
      colorType: '#729f3f',
      colorFont: '#fff',
    };
  }
  if (typeName === 'normal') {
    return {
      colorType: '#b3babd',
      colorFont: '#000',
    };
  }
  if (typeName === 'electric') {
    return {
      colorType: '#eed535',
      colorFont: '#000',
    };
  }
  if (typeName === 'ground') {
    return {
      colorType: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
      colorFont: '#000',
    };
  }
  if (typeName === 'fairy') {
    return {
      colorType: '#fdb9e9',
      colorFont: '#000',
    };
  }
  if (typeName === 'fighting') {
    return {
      colorType: '#d56723',
      colorFont: '#fff',
    };
  }
  if (typeName === 'psychic') {
    return {
      colorType: '#f366b9',
      colorFont: '#fff',
    };
  }
  if (typeName === 'rock') {
    return {
      colorType: '#a38c21',
      colorFont: '#fff',
    };
  }
  if (typeName === 'steel') {
    return {
      colorType: '#9eb7b8',
      colorFont: '#000',
    };
  }
  if (typeName === 'ghost') {
    return {
      colorType: '#7b62a3',
      colorFont: '#fff',
    };
  }
  if (typeName === 'ice') {
    return {
      colorType: '#51c4e7',
      colorFont: '#212121',
    };
  }
  if (typeName === 'dragon') {
    return {
      colorType: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)',
      colorFont: '#fff',
    };
  }
  if (typeName === 'dark') {
    return {
      colorType: '#707070',
      colorFont: '#fff',
    };
  }


  return {
    colorType: '#000',
    colorFont: '#fff',
  }
};


export default Type;
