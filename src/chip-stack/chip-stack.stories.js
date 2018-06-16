import React from 'react';
import {text, select, boolean, number} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react';
import ChipStack from './chip-stack';
import Chip from '../chip/chip';

storiesOf('ChipStack', module)
    .add('Normal stacks', () => (
        <div style={{display: 'flex'}}>
            <ChipStack style={{margin: '20px'}}>
                <Chip value={10}/>
                <Chip value={10}/>
                <Chip value={10}/>
                <Chip value={10}/>
                <Chip value={10}/>
            </ChipStack>
            <ChipStack style={{margin: '20px'}}>
                <Chip value={25}/>
                <Chip value={25}/>
                <Chip value={25}/>
                <Chip value={25}/>
                <Chip value={25}/>
                <Chip value={25}/>
                <Chip value={25}/>
            </ChipStack>
        </div>
    ))
    .add('Empty stack', () => (
        <ChipStack/>
    ))
    .add('Playground', () => (
        <div style={{display: 'flex'}}>
            <ChipStack
                diameter={number('diameter', 120)}
                stackLayerOffset={number('stackLayerOffset', 2)}
                largeStackLayerOffset={number('largeStackLayerOffset', 1)}
                style={{margin: '20px'}}
            >
                <Chip value={50}/>
                <Chip value={50}/>
                <Chip value={50}/>
            </ChipStack>
            <ChipStack
                diameter={number('diameter', 120)}
                stackLayerOffset={number('stackLayerOffset', 2)}
                largeStackLayerOffset={number('largeStackLayerOffset', 1)}
                style={{margin: '20px'}}
            >
                <Chip value={100}/>
                <Chip value={100}/>
                <Chip value={100}/>
                <Chip value={100}/>
                <Chip value={100}/>
                <Chip value={100}/>
                <Chip value={100}/>
                <Chip value={100}/>
                <Chip value={100}/>
            </ChipStack>
        </div>
    ));