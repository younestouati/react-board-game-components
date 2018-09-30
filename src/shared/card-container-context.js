import React from 'react';

const defaultContext = {
    isInCardContainer: false,
    faceUp: undefined,
    rotateY: undefined,
    borderRadius: undefined,
    animateRotation: undefined,
    height: undefined,
    width: undefined,
};

const CardContainerContext = React.createContext(defaultContext);

export default CardContainerContext;