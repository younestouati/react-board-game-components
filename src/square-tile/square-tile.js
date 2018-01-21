import React from 'react';
import NTile from '../n-tile/n-tile';
import PropTypes from 'prop-types'

const SquareTile = (props) => <NTile n={4} {...props} flatTop={true}/>;

SquareTile.propTypes = {
    shadow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    children: PropTypes.node,
    bevel: PropTypes.bool
};

export default SquareTile;