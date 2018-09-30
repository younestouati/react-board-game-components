import React from 'react';
import {number, array} from '@storybook/addon-knobs/react';
import Deck from '@younestouati/playing-cards-standard-deck';
import {storiesOf} from '@storybook/react';
import CardRow from './card-row';
import makeStandardDeck from '../card/make-standard-deck';

const StandardPlayingCard = makeStandardDeck(Deck);

storiesOf('CardRow', module)
    .add('As normal row', () => (
        <div style={{margin: '30px'}}>
            <CardRow style={{ width: '100%', border: '1px dashed lightgray' }} aspectRatio={5}>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
                <StandardPlayingCard/>
            </CardRow>
        </div>
    ))
    .add('Playground', () => (
        <div style={{margin: '30px'}}>
            <CardRow
                style={{ width: '100%', border: '1px dashed lightgray'  }}
                aspectRatio={number('aspectRatio', 5)}
                cardAspectRatio={number('cardAspectRatio', .7)}
                preferredGap={number('preferredGap', 0.1)}
                emptyIndices={array('emptyIndices', [])}
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
            </CardRow>
        </div>
    ));
