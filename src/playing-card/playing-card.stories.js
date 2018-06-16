import React from 'react';
import {text, select, boolean, number, object} from '@storybook/addon-knobs/react';
import Deck from '@younestouati/playing-cards-standard-deck';

import {storiesOf} from '@storybook/react';

import PlayingCard from './playing-card';
import makeStandardDeck from './make-standard-deck';
//https://www.fairway3games.com/free-poker-sized-card-templates/
import Custom1Front from './assets/custom-card-2-with-text.png';
import Custom1Back from './assets/custom-card-2-with-text-back-side.png';
import Custom2Front from './assets/custom-card-4-with-text.jpg';
import Custom2Back from './assets/custom-card-4-with-text-back-side.jpg';

import CustomDemoCardFront from './custom-demo-cards/front';
import CustomDemoCardBack from './custom-demo-cards/back';

const containerStyle = {display: 'flex', flexWrap: 'wrap'};
const wrapperStyle = {margin: '0 10px 10px 0'};

const StandardDeck = makeStandardDeck(
  Deck,
  {}, 
  {backgroundSize: '7px 10px', backgroundClip: 'content-box', padding: '5%', backgroundRepeat: 'repeat'}
);

storiesOf('PlayingCard', module)
  .add('Standard Cards', () => {
    const suits = ['hearts', 'clubs', 'spades', 'diamonds'];

    return (
      <div style={containerStyle}>
        {
          suits.map(suit => Array(13).fill().map((_, rank) => (
            <div style={wrapperStyle} key={`${suit}_${rank}`}>
              <StandardDeck
                suit={suit}
                rank={rank + 1}
                faceUp={boolean('faceUp', true)}
                borderRadius={text('borderRadius', '6px')}
                border={false}
              />
            </div>
          )))
        }
        <div style={wrapperStyle}>
          <StandardDeck
            isJoker={true}
            faceUp={boolean('faceUp', true)}
            borderRadius={text('borderRadius', '6px')}
          />
        </div>
      </div>
    );
  })
  .add('Custom Cards (graphics)', () => {
    return (
      <div style={containerStyle}>
        <div style={wrapperStyle}>
          <PlayingCard
            front={Custom1Front}
            back={Custom1Back}
            faceUp={boolean('faceUp', true)}
            borderRadius={false}
            border={false}
            height={285}
          />
        </div>
        <div style={wrapperStyle}>
          <PlayingCard
            front={Custom2Front}
            back={Custom2Back}
            faceUp={boolean('faceUp', true)}
            borderRadius='12px'
            border={false}
            height={285}
            width={209}
          />
        </div>
      </div>
    );
  })
  .add('Custom Cards (markup)', () => {
    return (
      <div style={containerStyle}>
        <div style={wrapperStyle}>
          <PlayingCard
            front={<CustomDemoCardFront/>}
            back={<CustomDemoCardBack/>}
            faceUp={boolean('faceUp', true)}
            borderRadius='12px'
            border={false}
            height={285}
          />
        </div>
      </div>
    );
  })
  .add('Playground (Standard Deck)', () => {
    const suits = ['hearts', 'clubs', 'spades', 'diamonds'];
    const ranks = {
      ace: 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'jack': 11,
      'queen': 12,
      'king': 13,
    }

    return (
      <StandardDeck
        suit={select('hearts', suits)}
        rank={select('rank', ranks)}
        isJoker={boolean('isJoker', false)}
        faceUp={boolean('faceUp', true)}
        rotation={number('rotation', 0, {min: -360, max: 360, step: 1, range: true})}
        animateRotation={boolean('animateRotation', true)}
        shadow={boolean('shadow', true)}
        border={boolean('border', true)}
        borderRadius={text('borderRadius', '6px')}
        width={number('width', 210)}
        height={number('height', 300)}
        aspectRatio={number('aspectRatio', 210/300)}
      />
    )
    }).add('Playground (Custom Cards)', () => {  
      return (
        <PlayingCard
          front={text('front', 'https://i.imgur.com/r5ZuuBn.jpg')}
          back={text('back', 'https://i.imgur.com/YtkhlRj.jpg')}
          faceUp={boolean('faceUp', true)}
          rotation={number('rotation', 0, {min: -360, max: 360, step: 1, range: true})}
          animateRotation={boolean('animateRotation', true)}
          shadow={boolean('shadow', true)}
          border={boolean('border', true)}
          borderRadius={text('borderRadius', '6px')}
          width={number('width', 210)}
          height={number('height', 300)}
          aspectRatio={number('aspectRatio', 210/300)}
        />
      )
    });