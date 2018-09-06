import React from 'react';
import PropTypes from 'prop-types';
import { Flipper } from '../flipper/flipper';
import { CardStackContext } from '../card-stack/card-stack';
import isNullOrUndefined from '../utils/is-null-or-undefined';
import isBoolean from '../utils/is-boolean';
import isObject from '../utils/is-object';
import isNumeric from '../utils/is-numeric';
import getFirstDefinedValue from '../utils/get-first-defined-value';

const DEFAULT_CARD_WIDTH = 210;
const DEFAULT_CARD_HEIGHT = 300;

const baseStyles = {
	backgroundPosition: 'center center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	display: 'inline-block',
	boxSizing: 'border-box',
	position: 'absolute',
	overflow: 'hidden',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'white',
};

const renderSide = (side, style) => isObject(side) 
	? <div style={style}>{side}</div>
	: <div style={{ ...style, backgroundImage: `url(${side})`}}/>;

const getStyle = (props, stackContext) => {
	const shadow = getFirstDefinedValue(props.shadow, stackContext.shadow, true);
	const animateShadow = getFirstDefinedValue(props.animateShadow, stackContext.animateShadow, true);
	const border = getFirstDefinedValue(props.border, stackContext.border, true);
	const borderRadius = getFirstDefinedValue(props.borderRadius, stackContext.borderRadius, true);

	let shadowStyle = { boxShadow: shadow };
	let borderStyle = { border };
	let borderRadiusStyle = { borderRadius };

	if (isBoolean(shadow)) {
		shadowStyle = shadow ? { boxShadow: '1px 1px 2px 0px rgba(82,81,82,1)' } : {};
	} else if (isNumeric(shadow)) {
		shadowStyle = {boxShadow: `${shadow}px ${shadow}px ${shadow}px 0px rgba(82,81,82,1)`}
	}

	if (isBoolean(animateShadow)) {
		shadowStyle.transition =  animateShadow ? '0.4s box-shadow' : '';
	} else if (isNumeric(animateShadow)) {
		shadowStyle.transition = `${animateShadow}s box-shadow`;
	}

	if (isBoolean(border)) {
		borderStyle = border ? { border: '1px solid #efefef' } : {};
	} else if (isNumeric(border)) {
		borderStyle = { border: `${border}px solid #efefef`}
	}

	if (isBoolean(borderRadius)) {
		borderRadiusStyle = borderRadius ? { borderRadius: '6px' } : {};
	} else if (isNumeric(borderRadius)) {
		borderRadiusStyle = { borderRadius: `${borderRadius}px`}
	}

	return {
		...shadowStyle,
		...borderStyle,
		...borderRadiusStyle,
		...baseStyles,
	};
}

const Card = (props) => {
	const {
		frontStyle,
		backStyle,
		borderRadius,
		front,
		back,
	} = props;
	
	return (
		<CardStackContext.Consumer>
			{
				stackContext => {
					const styles = getStyle(props, stackContext);

					const defaultWidth = stackContext.isInStack ? '100%' : DEFAULT_CARD_WIDTH;
					const defaultHeight = stackContext.isInStack ? '100%' : DEFAULT_CARD_HEIGHT;

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

					return (
						<div
							style={{
								width: isNaN(width) ? width : `${width}px`,
								height: isNaN(height) ? height : `${height}px`,
								position: 'relative',
								display: 'inline-block',
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
									isFlipped={!getFirstDefinedValue(props.faceUp, stackContext.faceUp, false)}
									rotation={getFirstDefinedValue(props.rotateY, stackContext.rotateY, 0)}
									animateRotation={getFirstDefinedValue(props.animateRotation, stackContext.animateRotation, true)}
								>
									{renderSide(front, { ...styles, ...frontStyle })}
									{renderSide(back, { ...styles, ...backStyle })}
								</Flipper>
							</div>
						</div>
					)
				}
			}
		</CardStackContext.Consumer>
	);
}

Card.propTypes = {
	front: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	back: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	faceUp: PropTypes.bool,
	rotateY: PropTypes.number,
	shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
	border: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
	borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
	animateRotation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	animateShadow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	width: PropTypes.number,
	height: PropTypes.number,
	aspectRatio: PropTypes.number,
	frontStyle: PropTypes.object,
	backStyle: PropTypes.object,
};

Card.defaultProps = {
	frontStyle: {},
	backStyle: {},
};

export { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH };
export default Card;
