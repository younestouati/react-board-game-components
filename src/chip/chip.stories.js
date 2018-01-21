import React from 'react';
import {text, boolean, number, object} from '@storybook/addon-knobs/react';

import {storiesOf} from '@storybook/react';

import Chip from './chip';

const containerStyle = {display: 'flex', flexWrap: 'wrap'};
const wrapperStyle = {margin: '0 10px 10px 0'};

storiesOf('Chip', module)
  .add('Standard values', () => {
    const values = [1, 2, 5, 10, 20, 25, 50, 100, 250, 500, 1000, 2000, 5000];

    return (
      <div style={containerStyle}>
        {
          values.map(value => (
            <div style={wrapperStyle} key={value}>
              <Chip value={value}/>
            </div>
          ))
        }
      </div>
    );
  })
  .add('Custom values', () => {
    const chips = [
      {value: 8},
      {value: 15, color: 'DarkSalmon'},
      {value: 35, color: 'coral', textColor: 'DarkGoldenRod'}
    ];

    return (
      <div style={containerStyle}>
        {
          chips.map(({value, color, textColor}) => (
            <div style={wrapperStyle} key={value}>
              <Chip value={value} color={color} textColor={textColor}/>
            </div>
          ))
        }
      </div>
    );
  })
  .add('Standard value, custom color', () => <Chip value={25} color="cornflowerblue"/>)
  .add('Playground', () => (
    <Chip
      value={number('value', 25)}
      color={text('color', 'grey')}
      textColor={text('textColor', '')}
      diameter={number('diameter', 120)}
      shadow={boolean('shadow', true)}
    />
  ));

