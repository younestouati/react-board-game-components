import React from 'react';
import PropTypes from 'prop-types';
import standardChips from './standard-chips';
import { ChipStackContext } from '../chip-stack/chip-stack';
import getFirstDefinedValue from '../utils/get-first-defined-value';

const DEFAULT_CHIP_DIAMETER = 120;

const Chip = ({value, diameter: propDiameter, shadow, color: propColor, textColor: propTextColor}) => {
	const isStandardValue = standardChips.hasOwnProperty(value + '');
	let color, textColor;

	if (isStandardValue) {
		const {color: standardColor, textColor: standardTextColor} = standardChips[value + ''];
		color = propColor || standardColor;
		textColor = standardTextColor && !(propColor || propTextColor) 
			? standardTextColor
			: propTextColor || color;
	} else {
		color = propColor || 'grey';
		textColor = propTextColor || color;
	}

	const textFilter = color === textColor ? 'url(#darken)' : 'none'; 

	const shadowStyle = typeof(shadow) === "boolean" 
		? (shadow ? {boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.4) inset'} : {})
		: {boxShadow: shadow};

	return (
		<ChipStackContext.Consumer>
			{
				({ isInStack }) => {
					const diameter = !isInStack ? getFirstDefinedValue(propDiameter, DEFAULT_CHIP_DIAMETER) : '100%';

					return (
						<svg
							viewBox="0 0 200 200"
							style={{
								borderRadius: '50%',
								width: isNaN(diameter) ? diameter : `${diameter}px`,
								height: isNaN(diameter) ? diameter : `${diameter}px`,
								...shadowStyle
							}}
							xmlns="http://www.w3.org/2000/svg"
						>
							<defs>
								<filter id="darken">
									<feComponentTransfer>
										<feFuncR type="linear" slope="1" intercept="-.05"/>
										<feFuncG type="linear" slope="1" intercept="-.05"/>
										<feFuncB type="linear" slope="1" intercept="-.05"/>
									</feComponentTransfer>
								</filter>
							</defs>			
							<circle
								cx="100"
								cy="100"
								r="100"
								style={{fill: color}}
							/>
							<circle
								cx="100"
								cy="100"
								r="92"
								style={{
									fill: 'none',
									strokeDasharray: '25.8 70.4',
									strokeDashoffset: '12px',
									stroke: 'white',
									strokeWidth: '17px'
								}}
							/>
							<circle
								filter={textFilter}
								cx="100"
								cy="100"
								r="70"
								style={{
									fill: 'none',
									stroke: textColor,
									strokeWidth: '3px'
								}}
							/>
							<circle
								cx="100"
								cy="100"
								r="70"
								style={{
									fill: 'none',
									strokeDasharray: '18.6 18',
									strokeDashoffset: '9px',
									stroke: 'white',
									strokeWidth: '3px'
								}}
							/>
							<text
								x="100"
								y="100"
								filter={textFilter}
								fill={textColor}
								textAnchor="middle"
								alignmentBaseline="central"
								style={{
									fontFamily: 'arial',
									fontSize: '60px',
									fontWeight: 'bold',
									textShadow: '-1px -1px 0px rgba(0, 0, 0, 0.3), 1px 1px 0px rgba(255, 255, 255, 0.2)'
								}}
							>
								{value}
							</text>
						</svg>
					)
				}
			}
		</ChipStackContext.Consumer>
	)
}

Chip.propTypes = {
	value: PropTypes.number.isRequired,
	diameter: PropTypes.number,
	color: PropTypes.string,
	textColor: PropTypes.string,
	shadow: PropTypes.bool
};

Chip.defaultProps = {
	shadow: true
};

export { DEFAULT_CHIP_DIAMETER };
export default Chip;