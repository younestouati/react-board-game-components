import PropTypes from 'prop-types';

const handleMissingProp = (isRequired, propName, componentName) => {
	if (isRequired) {
		return new Error(`Missing required property ${propName} in ${componentName}`);
	}

	return null;
};

const createCaseInsentivePropType = (validValues, isRequired) => {
    return (props, propName, componentName) => {
        const prop = props[propName];
        const type = typeof prop;
        const caseInsensitiveProp = type === 'string' ? prop.toLowerCase() : prop;

		if (type === 'undefined') {
			return handleMissingProp(isRequired, propName, componentName);
		}

        const isValid = validValues.indexOf(caseInsensitiveProp) > -1;
        
		if (!isValid) {
			return new Error(`${propName} in ${componentName} must be one of the Values: ${validValues.join(', ')}`);
		}

		return null;
	};
};

const validRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 'king', 'queen', 'jack', 'ace', 'joker'];
const validSuits = ['hearts', 'spades', 'clubs', 'diamonds'];

const rank = createCaseInsentivePropType(validRanks, false);
rank.isRequired = createCaseInsentivePropType(validRanks, true);

const suit = createCaseInsentivePropType(validSuits, false);
suit.isRequired = createCaseInsentivePropType(validSuits, true);

const CustomPropTypes = {rank, suit};
export {CustomPropTypes};