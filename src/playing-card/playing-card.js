import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from './custom-prop-types';
import {Flipper} from '../flipper/flipper';

const DEFAULT_CARD_WIDTH = 210;
const DEFAULT_CARD_HEIGHT = 300;

const isBool = (val) => typeof val === 'boolean';
const isObj = (val) => typeof val === 'object';
const baseStyles = {
	backgroundPosition: 'center center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'contain',
	backgroundColor: 'white',
	display: 'inline-block',
	boxSizing: 'border-box',
	position: 'absolute',
	overflow: 'hidden',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0
};

const PlayingCard = (props) => {
	const {
		borderRadius,
		animateRotation,
		front,
		back,
		shadow,
		border,
		rotation,
		//Using default values here rather than default props as it allows card stack to override the values, in case
		//they haven't be explicitly set on the component itself, while still supporting default values.
		faceUp = true,
		width = DEFAULT_CARD_WIDTH,
		height = DEFAULT_CARD_HEIGHT
	} = props;

	const shadowStyle = isBool(shadow)
			? (shadow ? {boxShadow: '1px 1px 2px 0px rgba(82,81,82,1)'} : {})
			: {shadow};
	const borderStyle = isBool(border)
			? (border ? {border: '1px solid #efefef'} : {})
			: {border};
	const borderRadiusStyle = isBool(borderRadius) 
			? (borderRadius ? {borderRadius: '6px'} : {})
			: {borderRadius};

	const styles = {
		...shadowStyle,
		...borderStyle,
		...borderRadiusStyle,
		...baseStyles
	};

	const renderSide = (side) => isObj(side) 
			? <div style={styles}>{side}</div>
			: <div style={{backgroundImage: `url(${side})`, ...styles}}/>;

	return (
		<div
			style={{
				width: `${width}px`,
				height: `${height}px`
			}}
		>
			<Flipper isFlipped={!faceUp} rotation={rotation} animateRotation={animateRotation}>
				{renderSide(front)}
				{renderSide(back)}
			</Flipper>
		</div>
	);
}

PlayingCard.propTypes = {
	front: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	back: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	faceUp: PropTypes.bool,
	rotation: PropTypes.number,
	shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	border: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	animateRotation: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number
};

PlayingCard.defaultProps = {
	animateRotation: true,
	borderRadius: true,
	border: true,
	shadow: true,
	rotation: 0
};

export default PlayingCard;