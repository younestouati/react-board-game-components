import React from 'react';
import {text, select, boolean, number} from '@storybook/addon-knobs/react';
import Deck from '@younestouati/playing-cards-standard-deck';
import {storiesOf} from '@storybook/react';
import CardStack from './card-stack';
import makeStandardDeck from '../playing-card/make-standard-deck';

const StandardPlayingCard = makeStandardDeck(
    Deck,
    {}, 
    {backgroundSize: '7px 10px', backgroundClip: 'content-box', padding: '5%', backgroundRepeat: 'repeat', backgroundColor: 'white'}
  );

storiesOf('CardStack', module)
    .add('As normal stack', () => (
        <CardStack>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
        </CardStack>
    ))
    .add('As messy stack', () => (
        <CardStack messy={true}>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
        </CardStack>
    ))
    .add('Empty stack', () => (
        <CardStack/>
    ))
    .add('Playground', () => (
        <CardStack
            messy={boolean('messy', true)}
            messAngle={number('messAngle', 20)}
            width={number('width', 210)}
            height={number('height', 300)}
            aspectRatio={number('aspectRatio', 0.7)}
            faceUp={boolean('faceUp', false)}
            stackLayerOffset={number('stackLayerOffset', 1)}
            stackLayerMaxOffset={number('stackLayerMaxOffset', 10)}
        >
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
            <StandardPlayingCard/>
        </CardStack>
    ));