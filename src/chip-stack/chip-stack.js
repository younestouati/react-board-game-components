import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CHIP_DIAMETER } from '../chip/chip';

const defaultChipStackStyles = {
	border: '2px dashed lightgray',
    position: 'relative',
    borderRadius: '100%',
    boxSizing: 'border-box',
    fontSize: '12px',
};

const defaultChipStackItemStyles = {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

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
				<div 
					style={{
						...defaultChipStackStyles,
						...style,
						width: diameter,
						height: diameter
					}}
				>
					{
						React.Children.map(children, (child, i) => {
							const stackItemStyle = {
								'transform': `translate(${offset*i}px,${offset*i}px)`
							};

							return (
								<div 
									style={{
										...defaultChipStackItemStyles,
										...stackItemStyle
									}}
								>
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