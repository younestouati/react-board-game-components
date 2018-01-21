import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './board.css';

function completeZoomRect(zoomRect) {
	const values = {};

	edges.forEach((edge) => {
		values[edge] = typeof zoomRect[edge] !== 'undefined' ? zoomRect[edge] : defaultEdgeValues[edge];
	});

	return values;
}

function preserveAspectRatio(zoomRect) {
	let excess;

	if (zoomRect.right - zoomRect.left > zoomRect.bottom - zoomRect.top) {
		excess = (zoomRect.right - zoomRect.left) - (zoomRect.bottom - zoomRect.top);

		return Object.assign({}, zoomRect, {
			top: zoomRect.top - excess/2,
			bottom: zoomRect.bottom + excess/2
		});
	}

	if (zoomRect.right - zoomRect.left < zoomRect.bottom - zoomRect.top) {
		excess =  (zoomRect.bottom - zoomRect.top) - (zoomRect.right - zoomRect.left);

		return Object.assign({}, zoomRect, {
			top: zoomRect.left - excess/2,
			bottom: zoomRect.right + excess/2
		});
	}

	return zoomRect;
}

function forceZoomRectInsideBoard(zoomRect) {
	if (zoomRect.top < 0) {
		return Object.assign({}, zoomRect, {top: 0, bottom: zoomRect.bottom + (-zoomRect.top)});
	}

	if (zoomRect.bottom > 1) {
		return Object.assign({}, zoomRect, {top: zoomRect.top - (zoomRect.bottom - 1), bottom: 1});
	}

	if (zoomRect.left < 0) {
		return Object.assign({}, zoomRect, {left: 0, right: zoomRect.right + (-zoomRect.left)});
	}

	if (zoomRect.right > 1) {
		return Object.assign({}, zoomRect, {left: zoomRect.left - (zoomRect.right - 1), right: 1});
	}

	return zoomRect;
}


class Board extends Component {
	render() {
		const {zoomRect, style, backgroundImage} = this.props;
		const zr = forceZoomRectInsideBoard(preserveAspectRatio(completeZoomRect(zoomRect)));

		const scale = 1/(zr.right - zr.left);
		const xOffset = zr.left * 100;
		const yOffset = zr.top * 100;

		return (
			<div
				style={style}
				className="boardgame-board-outer"
			>
				<div
					className="boardgame-board-inner"
					style={{
						width: `100%`,
						height: `100%`,
						transformOrigin: `0 0`,
						transform: `scale(${scale}) translate(${-xOffset}%, ${-yOffset}%)`,
						transition: `transform .4s linear`,
						backgroundImage: `url(${backgroundImage})`,
						backgroundSize: `contain`,
						backgroundPosition: `0 0`
					}}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

const edges = ['top', 'bottom', 'left', 'right'];
const defaultEdgeValues = {
	top: 0,
	bottom: 1,
	left: 0,
	right: 1
};

function isNumberBetween0And1OrUndefined(value) {
	const type = typeof value;
	return type === 'undefined' || (type === 'number' && value >=0  && value <= 1);
}

const isValidZoomRect = function(props, propName, componentName) {
	edges.forEach((edge) => {
		if (!isNumberBetween0And1OrUndefined(props[propName][edge])) {
			return new Error(`Invalid property ${edge} of ${propName} supplied to ${componentName}. Was ${props[propName][edge]}. Must be a number between 0 and 1`);
		}
	});

	const completedZoomRect = completeZoomRect(props[propName]);

	if (completedZoomRect.top >= completedZoomRect.bottom) {
		return new Error(`Value of property bottom of ${propName} for ${componentName} component must be larger than the value of property top`);
	}

	if (completedZoomRect.left >= completedZoomRect.right) {
		return new Error(`Value of property right of ${propName} for ${componentName} component must be larger than the value of property left`);
	}
};

Board.propTypes = {
	rotation: PropTypes.number,
	zoomRect: isValidZoomRect,
	style: PropTypes.object,
	background: PropTypes.string
};

Board.defaultProps = {
	rotation: 0,
	zoomRect: defaultEdgeValues,
	style: {}
};

export default Board;