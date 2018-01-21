import React from 'react';
import {text, select, boolean, number} from '@storybook/addon-knobs/react';

import {storiesOf} from '@storybook/react';

import SquareTile from './square-tile';

const containerStyle = {display: 'flex', flexWrap: 'wrap'};
const wrapperStyle = {margin: '0 10px 10px 0'};
const textStyle = {
    font: 'normal 2em verdana',
    top: '50%',
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    transform: 'translateY(-50%)',
    margin: 0,
    color: 'white',
    textShadow: '2px 2px 2px #222222'
};

storiesOf('SquareTile', module)
    .add('With solid color', () => (
        <div style={containerStyle}>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    backgroundColor="cornflowerblue"
                />
            </div>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    bevel={true}
                    shadow={true}
                    backgroundColor="cornflowerblue"
                />
            </div>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    bevel={true}
                    shadow={true}
                    backgroundColor="cornflowerblue"
                    borderWidth={10}
                />
            </div>
        </div>
    ))
    .add('With background image', () => (
        <div style={containerStyle}>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    backgroundImage="https://i.pinimg.com/736x/5d/dc/c6/5ddcc6b3b983e4d32f9d2495187ce834--fantasy-art-art-gallery.jpg"
                />
            </div>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    bevel={true}
                    shadow={true}
                    backgroundImage="https://i.imgur.com/RIhHH2f.jpg"
                />
            </div>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    bevel={true}
                    shadow={true}
                    backgroundImage="https://i.imgur.com/RIhHH2f.jpg"
                    borderWidth={10}
                />
            </div>
        </div>
    ))
    .add('With child elements', () => (
        <div style={containerStyle}>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    backgroundImage="https://i.pinimg.com/736x/5d/dc/c6/5ddcc6b3b983e4d32f9d2495187ce834--fantasy-art-art-gallery.jpg"
                >
                    <h1 style={textStyle}>
                        SquareTile
                    </h1>
                </SquareTile>
            </div>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    bevel={true}
                    shadow={true}
                    backgroundImage="https://i.imgur.com/RIhHH2f.jpg"
                >
                    <h1 style={textStyle}>
                        SquareTile
                    </h1>
                </SquareTile>
            </div>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    bevel={true}
                    shadow={true}
                    backgroundImage="https://i.imgur.com/RIhHH2f.jpg"
                    borderWidth={10}
                >
                    <h1 style={textStyle}>
                        SquareTile
                    </h1>
                </SquareTile>
            </div>
            <div style={wrapperStyle}>
                <SquareTile
                    radius={150}
                    bevel={true}
                    shadow={true}
                    backgroundColor="cornflowerblue"
                    borderWidth={10}
                >
                    <h1 style={textStyle}>
                        SquareTile
                    </h1>
                </SquareTile>
            </div>
        </div>
    ))
    .add('Playground', () => (
        <SquareTile
            radius={number('radius', 150)}
            bevel={boolean('bevel', true)}
            shadow={boolean('shadow', true)}
            backgroundColor={text('backgroundColor', 'cornflowerblue')}
            backgroundImage={text('backgroundImage', undefined)}
            borderWidth={number('borderWidth', 0)}
            borderColor={text('borderColor', '#efefef')}
        />
    ));