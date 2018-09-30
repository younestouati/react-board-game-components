import React from 'react';
import PropTypes from 'prop-types';
import isBoolean from '../utils/is-boolean';

const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'inline-block',
    perspective: '1000px'
};

const flipperStyles = {
    transformStyle: 'preserve-3d',
    position: 'relative',
    width: '100%',
    height: '100%',
};

const frontStyles = {
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    zIndex: 2,
    transform: 'rotateY(0deg)', //for firefox 31
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0
};

const backStyles = {
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0
};

const Flipper = ({animateRotation, rotation, children}) => (
    <div style={{...containerStyles}}>
        <div
            style={{
                transition: animateRotation ? (isBoolean(animateRotation) ? '0.4s' : `${animateRotation}s`) : 'none',
                transform: `rotateY(${rotation}deg`,
                ...flipperStyles
            }}      
        >
            <div style={frontStyles}>{children[0]}</div>
            <div style={backStyles}>{children[1]}</div>
        </div>
    </div>
);

Flipper.propTypes = {
    rotation: PropTypes.number,
    animateRotation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    children: PropTypes.node.isRequired
};

Flipper.defaultProps = {
    rotation: 0,
    animateRotation: true
};

export {Flipper};