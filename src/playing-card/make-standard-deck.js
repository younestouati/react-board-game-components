import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from './custom-prop-types';
import PlayingCard from './playing-card';

const defaultFrontFragment = (suit, rank, isJoker) => {
	let r = typeof rank === 'string' ? rank.toLowerCase() : rank;
	r = r === 'ace' ? 1 : r;
	r = r === 'jack' ? 11 : r;
	r = r === 'queen' ? 12 : r;
	r = r === 'king' ? 13 : r;

	return isJoker ? 'joker' : (r + suit.charAt(0));
}

const defaultBackFragment = () => 'back';

const makeStandardDeck = (
	svgStack,
	frontFragment = defaultFrontFragment,
	backFragment = defaultBackFragment
) => {
	const standardCard = (props) => {
		return (
            <PlayingCard
                {...props}
                front={`${svgStack}#${frontFragment(props.suit, props.rank, props.isJoker)}`}
                back={`${svgStack}#${backFragment()}`}
                deck={svgStack}
                frontFragment={frontFragment}
                backFragment={backFragment}
            />
        );
    }

    standardCard.propTypes = {
        rank: CustomPropTypes.rank.isRequired,
        suit: CustomPropTypes.suit.isRequired,
        isJoker: PropTypes.bool
    };

    standardCard.defaultProps = {
        rank: 1,
        suit: 'hearts',
        back: 'back',
        isJoker: false
    };

    return standardCard;
};

export default makeStandardDeck;