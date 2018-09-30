import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CARD_WIDTH } from '../card/card';
import CardContainerContext from '../shared/card-container-context';
import isNullOrUndefined from '../utils/is-null-or-undefined';
import isBoolean from '../utils/is-boolean';
import isNumeric from '../utils/is-numeric';

const defaultStackItemStyles = {
    position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
    width: '100%',
    height: '100%',
};

const defaultRandomNumbers = [0, -5, 5, 0, -2, -4, -1, 5, 1, 3, 8];
const defaultMessy = false;
const defaultStackLayerOffset = 1;
const defaultStackLayerMaxOffset = 10;

function getTransformForCardInCardStack(props, cardIndex) {
	const { 
		messy = defaultMessy,
		stackLayerOffset = defaultStackLayerOffset,
		stackLayerMaxOffset = defaultStackLayerMaxOffset
	} = props;

	const randomNumbers = Array.isArray(messy) ? messy : defaultRandomNumbers;

	return messy
		? { 
			x: 0,
			y: 0,
			rotate: randomNumbers[cardIndex % randomNumbers.length]
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
			style,
			className,
			width: rawWidth,
			height: rawHeight,
			faceUp,
			rotateY,
			borderRadius, 
			insetBorder,
		} = this.props;

		const isHeightSet = !isNullOrUndefined(rawHeight) && rawHeight !== 0;
		const width = isNaN(rawWidth) ? rawWidth : `${rawWidth}px`;
		let height, paddingTop = 0;
		
		if (isHeightSet) {
			height = rawHeight;
		} else {
			paddingTop = `${100/this.props.aspectRatio}%`;
		}

		let insetBorderStyles = { border: insetBorder};
		if (isBoolean(insetBorder)) {
			insetBorderStyles = insetBorder ? { border: '2px dashed lightgray' } : '';
		} else if (isNumeric(insetBorder)) {
			insetBorderStyles = { border: `${insetBorder}px dashed lightgray` };			
		}
		
		let borderRadiusStyles = { borderRadius };
		if (isBoolean(borderRadius)) {
			borderRadiusStyles = borderRadius ? { borderRadius: '2%' } : {};
		} else if (isNumeric(borderRadius)) {
			borderRadiusStyles = { borderRadius: `${borderRadius}px` }
		}

        return (
			<CardContainerContext.Provider
				value={{
					isInCardContainer: true,
					faceUp,
					rotateY,
					borderRadius,
				}}
			>
				<div
					style={{
						position: 'relative',
						display: 'inline-block',
						...style,
						width,
						height,
					}}
					className={className}
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
								...insetBorderStyles,
								...borderRadiusStyles,
								boxSizing: 'border-box',
							}}
						/>
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
			</CardContainerContext.Provider>
        );
    }
}

CardStack.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	style: PropTypes.object,
	className: PropTypes.string,
	messy: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.number)]),
    stackLayerOffset: PropTypes.number,
	stackLayerMaxOffset: PropTypes.number,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // TODO: REMOVE
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // TODO: REMOVE
	aspectRatio: PropTypes.number,
	faceUp: PropTypes.bool,
	rotateY: PropTypes.number, // TODO: MERGE WITH FACEUP
	borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
	insetBorder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
};

CardStack.defaultProps = {
	style: {},
	className: '',
	messy: defaultMessy,
    stackLayerOffset: defaultStackLayerOffset,
	stackLayerMaxOffset: defaultStackLayerMaxOffset,
	width: DEFAULT_CARD_WIDTH,
	aspectRatio: 0.7,
	insetBorder: true,
	borderRadius: '2%',
};

export { getTransformForCardInCardStack };
export default CardStack;

/**
 * TODO:
 * - In card stack
 *  - Maybe introduce resizeObserver - only for warning if size is zero!
 *  - Drop width and height for stack! (but still support aspectRatio!)
 * 
 * - In card row
 * 	- No 'entry' animation
 * 
 * - In card
 *  - Fix background sizing (switch card in storybook)!
 */