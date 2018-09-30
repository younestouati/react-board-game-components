import React from 'react';
import { boolean, number, array } from '@storybook/addon-knobs/react';
import Deck from '@younestouati/playing-cards-standard-deck';
import {storiesOf} from '@storybook/react';
import CardStack from './card-stack';
import makeStandardDeck from '../card/make-standard-deck';
import './card-stack.stories.css';

const StandardPlayingCard = makeStandardDeck(Deck);

storiesOf('CardStack', module)
    .add('As normal stack', () => (
        <div style={{margin: '30px'}}>
            <CardStack>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
            </CardStack>
        </div>
    ))
    .add('As messy stack', () => (
        <div style={{margin: '30px'}}>
            <CardStack messy={true}>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
            </CardStack>
        </div>
    ))
    .add('Empty stack custom background', () => {
        return (
            <div style={{margin: '30px'}}>
                <CardStack className="stack"/>
            </div>
        )
    })
    .add('Playground', () => (
        <div style={{margin: '30px'}}>
            <CardStack
                messy={boolean('messy', true)}
                width={number('width', 210)}
                height={number('height', 300)}
                aspectRatio={number('aspectRatio', 0.7)}
                stackLayerOffset={number('stackLayerOffset', 1)}
                stackLayerMaxOffset={number('stackLayerMaxOffset', 10)}
                rotateY={number('rotateY', 0)}
                faceUp={boolean('faceUp', false)}
                animateRotation={boolean('animateRotation', true)}
                borderRadius={number('borderRadius', 6)}
                insetBorder={number('insetBorder', 1)}
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
        </div>
    ));