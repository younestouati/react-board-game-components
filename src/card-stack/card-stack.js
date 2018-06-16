import React from 'react';
import PropTypes from 'prop-types';
import {DEFAULT_CARD_WIDTH, DEFAULT_CARD_HEIGHT} from '../playing-card/playing-card';
import isNullOrUndefined from '../utils/is-null-or-undefined';
import './card-stack.css';

const randomNumbers = [0.14, 0.27, 0.08, 0.40, 0.97, 0.73, 0.33, 0.02, 0.58, 0.91];

const CardStackContext = React.createContext({
	isInStack: false,
});

class CardStack extends React.Component { 
    render() {
		const { 
			children,
			messy,
			faceUp,
			messAngle,
			stackLayerOffset,
			stackLayerMaxOffset,
			style,
			width: rawWidth,
			height: rawHeight,
		} = this.props;

		const isHeightSet = !isNullOrUndefined(this.props.height) && this.props.height !== 0;
		const width = isNaN(this.props.width) ? this.props.width : `${this.props.width}px`;
		let height, paddingTop = 0;
		
		if (isHeightSet) {
			height = this.props.height;
		} else {
			paddingTop = `${100/this.props.aspectRatio}%`;
		}

        return (
			<CardStackContext.Provider
				value={{
					isInStack: true,
					faceUpStack: faceUp,
				}}
			>
				<div className="card-stack" style={{
					...style,
					width,
					height,
					position: 'relative',
					display: 'inline-block'
				}}>
					<div
						style={{
							float: 'left',
							paddingTop
						}}
					/>
					<div
						style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
					>
						{
							React.Children.map(children, (child, i) => {
								const stackItemStyle = messy
									? { 'transform': `rotate(${randomNumbers[i % randomNumbers.length] * messAngle - messAngle/2}deg)` }
									: { 'transform': `translate(${Math.min(i * stackLayerOffset, stackLayerMaxOffset)}px,${Math.min(i * stackLayerOffset, stackLayerMaxOffset)}px)` };

								return (
									<div className="card-stack-item" style={stackItemStyle}>
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
	style: PropTypes.object,
	messy: PropTypes.bool,
	faceUp: PropTypes.bool,
    messAngle: PropTypes.number,
    stackLayerOffset: PropTypes.number,
	stackLayerMaxOffset: PropTypes.number,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	aspectRatio: PropTypes.number
};

CardStack.defaultProps = {
	style: {},
	messy: false,
	faceUp: false,
    messAngle: 15,
    stackLayerOffset: 1,
	stackLayerMaxOffset: 10,
	width: DEFAULT_CARD_WIDTH,
	aspectRatio: 0.7,
};

export { CardStackContext };
export default CardStack;