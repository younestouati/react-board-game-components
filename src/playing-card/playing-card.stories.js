import React from 'react';
import {text, select, boolean, number, object} from '@storybook/addon-knobs/react';
import Deck from '@younestouati/playing-cards-standard-deck';

import {storiesOf} from '@storybook/react';

import {PlayingCard, makeDeck} from './playing-card';
//https://www.fairway3games.com/free-poker-sized-card-templates/
import Custom1Front from './assets/custom-card-2-with-text.png';
import Custom1Back from './assets/custom-card-2-with-text-back-side.png';
import Custom2Front from './assets/custom-card-4-with-text.jpg';
import Custom2Back from './assets/custom-card-4-with-text-back-side.jpg';

import CustomDemoCardFront from './custom-demo-cards/front';
import CustomDemoCardBack from './custom-demo-cards/back';

const containerStyle = {display: 'flex', flexWrap: 'wrap'};
const wrapperStyle = {margin: '0 10px 10px 0'};

const StandardDeck = makeDeck(Deck);

storiesOf('PlayingCard', module)
  .add('Standard Cards', () => {
    const suits = ['hearts', 'clubs', 'spades', 'diamonds'];

    return (
      <div style={containerStyle}>
        {
          suits.map(suit => Array(13).fill().map((_, rank) => (
            <div style={wrapperStyle} key={`${suit}_${rank}`}>
              <StandardDeck card={{suit, rank: rank + 1 }}/>
            </div>
          )))
        }
        <div style={wrapperStyle}>
          <StandardDeck card={{joker: true}}/>
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
  .add('Playground', () => (
    <StandardDeck
      card={object('card', {
        suit: 'heart',
        rank: 7,
        joker: false
      })}
      front={text('front', undefined)}
      back={text('back', undefined)}
      faceUp={boolean('faceUp', true)}
      rotation={number('rotation', 0, {min: -360, max: 360, step: 1, range: true})}
      animateRotation={boolean('animateRotation', true)}
      shadow={boolean('shadow', true)}
      border={boolean('border', true)}
      borderRadius={number('borderRadius', 6, {min: 0, max: 100, step: 1, range: true})}
      width={number('width', 210)}
      height={number('height', 300)}
    />
  ));