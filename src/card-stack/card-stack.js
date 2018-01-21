import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlayingCard, {DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH} from '../playing-card/playing-card';
import './card-stack.css';

class CardStack extends Component {
	animateShuffling(duration) {

	}
	
	render() {
		const {children, width, height, flipped, mode, rowSpacing, messAngle, stackLayerOffset, stackLayerMaxOffset, style} = this.props;
		let xOffset = 0;
		let sizeStyle = {};

		if (width) {
			sizeStyle.width = width + 'px';
		}

		if (height) {
			sizeStyle.height = height + 'px';
		}

		if (!children || (Array.isArray(children) && !children.length)) {
			return (
				<div className="card-stack empty-card-stack" style={{...style, ...sizeStyle}}/>
			);
		}

		return (
			<div className="card-stack" style={{...style, ...sizeStyle}}>
			{
				React.Children.map(children, (child, i) => {
					//Cloned children and set default props (childs own props takes precedence, though)
					const clonedChild = React.cloneElement(child, {width, height, flipped, ...child.props});
					let stackStyle = {};

					switch (mode) {
						case 'stack':
							stackStyle  = {
								'left': Math.min(i * stackLayerOffset, stackLayerMaxOffset) + 'px',
								'top': Math.min(i * stackLayerOffset, stackLayerMaxOffset) + 'px'
							};
							break;
						case 'fan':
							const fanAngle = Math.min(children.length * 7, 300);

							stackStyle = {
								'transform': `rotate(${(-fanAngle/2 + (fanAngle/(children.length - 1) * i))}deg)`,
								'transformOrigin': '50% 110%'
							};
							break;
						case 'row':
							stackStyle  = {
								'transform': `translateX(${xOffset}px)`
							};
							xOffset += (child.props.width || width || DEFAULT_CARD_WIDTH) + rowSpacing;
							break;
						case 'messy-stack':
							//TODO: MAKE SURE NOT TO HAVE A RANDOM FUNCTION IN HERE. MAKES IT UNPURE!!
							stackStyle  = {
								'transform': `rotate(${Math.random() * messAngle - messAngle/2}deg)`,
							};
							break;
						default:
							stackStyle  = {};
							break;
					};

					return (
						<div className="stack-item" style={{left: 0, top: 0, ...stackStyle}}>
							{clonedChild}
						</div>
					);
				})
			}
			</div>
		);
	}
}

CardStack.propTypes = {
	children: function (props, propName, componentName) {
		const prop = props[propName];

		let error = null;
		React.Children.forEach(prop, function (child) {
			if (child.type !== PlayingCard) {
				error = new Error(`${componentName} children should be of type 'PlayingCard' not '${child.type}'`);
			}
		});
		return error;
	},
	width: PropTypes.number,
	height: PropTypes.number,
	style: PropTypes.object,
	flipped: PropTypes.bool,
	mode: PropTypes.oneOf(['fan', 'stack', 'row', 'messy-stack']),
	rowSpacing: PropTypes.number,
	messAngle: PropTypes.number,
	stackLayerOffset: PropTypes.number,
	stackLayerMaxOffset: PropTypes.number
};

CardStack.defaultProps = {
	mode: 'stack',
	style: {},
	rowSpacing: 10,
	messAngle: 30,
	stackLayerOffset: 1,
	stackLayerMaxOffset: 10
};

export default CardStack;