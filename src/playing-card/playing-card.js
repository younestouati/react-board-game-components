import React from 'react';
import PropTypes from 'prop-types';
import { Flipper } from '../flipper/flipper';
import { CardStackContext } from '../card-stack/card-stack';
import getFirstDefinedValue from '../utils/get-first-defined-value';
import isNullOrUndefined from '../utils/is-null-or-undefined';
import isBoolean from '../utils/is-boolean';
import isObject from '../utils/is-object';

const DEFAULT_CARD_WIDTH = 210;
const DEFAULT_CARD_HEIGHT = 300;

const baseStyles = {
	backgroundPosition: 'center center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
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
		frontStyle,
		backStyle,
		borderRadius,
		animateRotation,
		front,
		back,
		shadow,
		border,
		rotation,
	} = props;

	const shadowStyle = isBoolean(shadow)
			? (shadow ? {boxShadow: '1px 1px 2px 0px rgba(82,81,82,1)'} : {})
			: {boxShadow: shadow};
	const borderStyle = isBoolean(border)
			? (border ? {border: '1px solid #efefef'} : {})
			: {border};
	const borderRadiusStyle = isBoolean(borderRadius) 
			? (borderRadius ? {borderRadius: '6px'} : {})
			: {borderRadius};

	const styles = {
		...shadowStyle,
		...borderStyle,
		...borderRadiusStyle,
		...baseStyles,
	};

	const renderSide = (side, isBack) => isObject(side) 
			? <div style={{ ...styles, ...(isBack ? backStyle : frontStyle) }}>{side}</div>
			: <div style={{ backgroundImage: `url(${side})`, ...styles, ...(isBack ? backStyle : frontStyle) }}/>;

	return (
		<CardStackContext.Consumer>
			{
				({ isInStack, faceUpStack }) => {
					const defaultWidth = isInStack ? '100%' : DEFAULT_CARD_WIDTH;
					const defaultHeight = isInStack ? '100%' : DEFAULT_CARD_HEIGHT;

					const isWidthSet = !isNullOrUndefined(props.width);
					const isHeightSet = !isNullOrUndefined(props.height) && props.height !== 0;
					const isAspectRatioSet = !isNullOrUndefined(props.aspectRatio);
				
					const width = isWidthSet ? props.width : defaultWidth;
					let height, paddingTop = 0;
					
					if (isHeightSet || (isWidthSet && isAspectRatioSet)) {
						if (isHeightSet) {
							height = props.height;
						} else {
							paddingTop = `${100/props.aspectRatio}%`;
						}
					} else {
						height = defaultHeight;
					}

					const faceUp = !isInStack ? getFirstDefinedValue(props.faceUp, false) : getFirstDefinedValue(props.faceUp, faceUpStack);

					return (
						<div
							style={{
								background: 'white',
								width: isNaN(width) ? width : `${width}px`,
								height: isNaN(height) ? height : `${height}px`,
								position: 'relative',
								display: 'inline-block'
							}}
						>
							<div
								style={{
									float: 'left',
									paddingTop
								}}
							/>
							<div
								style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
							>
								<Flipper
									isFlipped={!faceUp}
									rotation={rotation}
									animateRotation={animateRotation}
								>
									{renderSide(front)}
									{renderSide(back, true)}
								</Flipper>
							</div>
						</div>
					)
				}
			}
		</CardStackContext.Consumer>
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
	height: PropTypes.number,
	aspectRatio: PropTypes.number,
	frontStyle: PropTypes.object,
	backStyle: PropTypes.object,
};

PlayingCard.defaultProps = {
	animateRotation: true,
	borderRadius: true,
	border: true,
	shadow: true,
	rotation: 0,
	frontStyle: {},
	backStyle: {},
};

export { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH };
export default PlayingCard;