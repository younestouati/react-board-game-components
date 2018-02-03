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
		deck,
		card,
		frontFragment,
		backFragment,
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
				{front 
					? renderSide(front) 
					: <div style={{backgroundImage: `url(${deck}#${frontFragment(card)})`, ...styles}}/>}
				{back 
					? renderSide(back)
					: <div style={{backgroundImage: `url(${deck}#${backFragment(card)})`, ...styles}}/>}
			</Flipper>
		</div>
	);
}

PlayingCard.propTypes = {
	deck: PropTypes.string,
	frontFragment: PropTypes.func,
	backFragment: PropTypes.func,
	card: PropTypes.object,
	front: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	back: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	faceUp: PropTypes.bool,
	rotation: PropTypes.number,
	shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	border: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
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

const defaultFrontFragment = (card = {rank: 1, suit: 'hearts'}) => {
	let r = typeof card.rank === 'string' ? card.rank.toLowerCase() : card.rank;
	r = r === 'ace' ? 1 : r;
	r = r === 'jack' ? 11 : r;
	r = r === 'queen' ? 12 : r;
	r = r === 'king' ? 13 : r;

	return card.joker ? 'joker' : (r + card.suit.charAt(0));
}

const defaultBackFragment = () => 'back';

const makeDeck = (
	svgStack,
	frontFragment = defaultFrontFragment,
	backFragment = defaultBackFragment
) => (
	(props) => (
		<PlayingCard
			{...props}
			deck={svgStack}
			frontFragment={frontFragment}
			backFragment={backFragment}
		/>
	)
);

export {PlayingCard, makeDeck};