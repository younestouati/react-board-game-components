import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CHIP_DIAMETER } from '../chip/chip';
import './chip-stack.css';

const ChipStackContext = React.createContext({
	isInStack: false,
});

class ChipStack extends React.Component { 
    render() {
		const { children, stackLayerOffset, largeStackLayerOffset, style, diameter: rawDiameter } = this.props;

		const chipCount = children ? children.length : 0;
		const diameter = isNaN(rawDiameter) ? rawDiameter : `${rawDiameter}px`;
		const offset = chipCount > 5 ? largeStackLayerOffset : stackLayerOffset;

        return (
			<ChipStackContext.Provider
				value={{
					isInStack: true,
				}}
			>
				<div className="chip-stack" style={{...style, width: diameter, height: diameter }}>
					{
						React.Children.map(children, (child, i) => {
							const stackItemStyle = {
								'transform': `translate(${offset*i}px,${offset*i}px)`
							};

							return (
								<div className="chip-stack-item" style={stackItemStyle}>
									{child}
								</div>
							);
						})
					}
				</div>
			</ChipStackContext.Provider>
        );
    }
}

ChipStack.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	style: PropTypes.object,
    stackLayerOffset: PropTypes.number,
	stackLayerMaxOffset: PropTypes.number,
	diameter: PropTypes.number,
};

ChipStack.defaultProps = {
	style: {},
	diameter: DEFAULT_CHIP_DIAMETER,
	stackLayerOffset: 2,
	largeStackLayerOffset: 1, 
};

export { ChipStackContext };
export default ChipStack;