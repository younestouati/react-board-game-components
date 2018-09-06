import React from 'react';
import {text, select, boolean, number, array} from '@storybook/addon-knobs/react';
import Deck from '@younestouati/playing-cards-standard-deck';
import {storiesOf} from '@storybook/react';
import CardStack from './card-stack';
import makeStandardDeck from '../card/make-standard-deck';

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
    .add('Empty stack', () => (
        <div style={{margin: '30px'}}>
            <CardStack/>
        </div>
    ))
    .add('Empty stack custom background', () => {
        const background = (
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontFamily: 'sans-serif',
                    color: 'lightgray'
                }}
            >
                Empty stack
            </div>
        );

        return (
            <div style={{margin: '30px'}}>
                <CardStack
                    background={background}
                />
            </div>
        )
    })
    .add('Playground', () => (
        <div style={{margin: '30px'}}>
            <CardStack
                messy={boolean('messy', true)}
                messAngle={number('messAngle', 20)}
                randomNumbers={array('randomNumbers', [0.43, 0.12, 0.55, 0.93, 0.83, 0.04, 0.34, 0.67])}
                width={number('width', 210)}
                height={number('height', 300)}
                aspectRatio={number('aspectRatio', 0.7)}
                stackLayerOffset={number('stackLayerOffset', 1)}
                stackLayerMaxOffset={number('stackLayerMaxOffset', 10)}
                rotateY={number('rotateY', 0)}
                faceUp={boolean('faceUp', false)}
                animateRotation={boolean('animateRotation', true)}
                shadow={number('shadow', 2)}
                border={number('border', 1)}
                borderRadius={number('borderRadius', 6)}
                stackBorder={number('stackBorder', 1)}
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