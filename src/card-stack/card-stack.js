import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CARD_WIDTH } from '../card/card';
import isNullOrUndefined from '../utils/is-null-or-undefined';
import isBoolean from '../utils/is-boolean';
import isNumeric from '../utils/is-numeric';
import isObject from '../utils/is-object';

const defaultStackStyles = {
    position: 'relative',
};

const defaultStackItemStyles = {
    position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
    width: '100%',
    height: '100%',
};

const defaultRandomNumbers = [0.5, 0.14, 0.77, 0.08, 0.40, 0.27, 0.73, 0.33, 0.02, 0.58, 0.91];
const defaultMessy = false;
const defaultMessAngle = 15;
const defaultStackLayerOffset = 1;
const defaultStackLayerMaxOffset = 10;

const CardStackContext = React.createContext({
	isInStack: false,
});

function getTransformForCardInCardStack(props, cardIndex) {
	const { 
		randomNumbers = defaultRandomNumbers,
		messAngle = defaultMessAngle,
		messy = defaultMessy,
		stackLayerOffset = defaultStackLayerOffset,
		stackLayerMaxOffset = defaultStackLayerMaxOffset
	} = props;

	return messy
		? { 
			x: 0,
			y: 0,
			rotate: randomNumbers[cardIndex % randomNumbers.length] * messAngle - messAngle/2 
		} : { 
			x: Math.min(cardIndex * stackLayerOffset, stackLayerMaxOffset),
			y: Math.min(cardIndex * stackLayerOffset, stackLayerMaxOffset),
			rotate: 0,
		};
}

class CardStack extends React.Component { 
    render() {
		const { 
			children,
			background,
			style,
			width: rawWidth,
			height: rawHeight,
			faceUp,
			rotateY,
			shadow,
			border,
			borderRadius,
			stackBorder,
			animateRotation,
			animateShadow,
		} = this.props;

		const isHeightSet = !isNullOrUndefined(rawHeight) && rawHeight !== 0;
		const width = isNaN(rawWidth) ? rawWidth : `${rawWidth}px`;
		let height, paddingTop = 0;
		
		if (isHeightSet) {
			height = rawHeight;
		} else {
			paddingTop = `${100/this.props.aspectRatio}%`;
		}

		let stackBorderStyles = { border: stackBorder};
		let borderRadiusStyles = { borderRadius };

		if (isBoolean(stackBorder)) {
			stackBorderStyles = stackBorder ? { border: '2px dashed lightgray' } : '';
		} else if (isNumeric(stackBorder)) {
			stackBorderStyles = { border: `${stackBorder}px dashed lightgray` };			
		}
		
		if (isBoolean(borderRadius)) {
			borderRadiusStyles = borderRadius ? { borderRadius: '6px' } : {};
		} else if (isNumeric(borderRadius)) {
			borderRadiusStyles = { borderRadius: `${borderRadius}px` }
		}

		let backgroundElement;
		if (background) {
			backgroundElement = isObject(background) 
			? background
			: <div style={{ background: `url(${background}`}}/>;
		}

        return (
			<CardStackContext.Provider
				value={{
					isInStack: true,
					faceUp,
					rotateY,
					shadow,
					border,
					borderRadius,
					animateRotation,
					animateShadow,
				}}
			>
				<div
					style={{
						...defaultStackStyles,
						...style,
						width,
						height,
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
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0
						}}
					>
						<div
							style={{
								...defaultStackItemStyles,
								...stackBorderStyles,
								...borderRadiusStyles,
								boxSizing: 'border-box',
							}}
						/>
						{backgroundElement}
						{
							React.Children.map(children, (child, i) => {
								const { x, y, rotate } = getTransformForCardInCardStack(this.props, i);

								return (
									<div 
										style={{
											...defaultStackItemStyles,
											transform: `translate(${x}px,${y}px) rotate(${rotate}deg)`,
										}}
									>
										{child}
									</div>
								);
							})
						}
					</div>
				</div>
			</CardStackContext.Provider>
        );
    }
}

CardStack.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	background: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	style: PropTypes.object,
	messy: PropTypes.bool,
	messAngle: PropTypes.number,
    stackLayerOffset: PropTypes.number,
	stackLayerMaxOffset: PropTypes.number,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	aspectRatio: PropTypes.number,
	faceUp: PropTypes.bool,
	rotateY: PropTypes.number,
	shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
	border: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
	borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
	animateRotation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	animateShadow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	randomNumbers: PropTypes.arrayOf(PropTypes.number),
	stackBorder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
};

CardStack.defaultProps = {
	style: {},
	messy: defaultMessy,
    messAngle: defaultMessAngle,
    stackLayerOffset: defaultStackLayerOffset,
	stackLayerMaxOffset: defaultStackLayerMaxOffset,
	randomNumbers: defaultRandomNumbers,
	width: DEFAULT_CARD_WIDTH,
	aspectRatio: 0.7,
	stackBorder: true,
	borderRadius: 6,
};

export { CardStackContext, getTransformForCardInCardStack };
export default CardStack;