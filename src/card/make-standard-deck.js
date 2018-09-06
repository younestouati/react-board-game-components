import React from 'react';
import PropTypes from 'prop-types';
import { rank, suit } from './custom-prop-types';
import Card from './card';

const defaultCardKey = (suit, rank, isJoker) => {
	let r = typeof rank === 'string' ? rank.toLowerCase() : rank;
	r = r === 'ace' ? 1 : r;
	r = r === 'jack' ? 11 : r;
	r = r === 'queen' ? 12 : r;
	r = r === 'king' ? 13 : r;

	return isJoker ? 'joker' : (r + suit.charAt(0));
}

const DefaultBack = () => (
    <div
        style={{
            background: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+CjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzliYTdiNCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iI2RlZiI+PC9jaXJjbGU+CjxwYXRoIGQ9Ik0wIDQwIEE0MCA0MCA0NSAwIDAgNDAgMCBBNDAgNDAgMzE1IDAgMCA4MCA0MCBBNDAgNDAgNDUgMCAwIDQwIDgwIEE0MCA0MCAyNzAgMCAwIDAgNDBaIiBmaWxsPSIjOWJhN2I0Ij48L3BhdGg+Cjwvc3ZnPg=="), padding-box linear-gradient(0deg,#ffffff, #ffffff), white`,
            backgroundSize: '4%',
            backgroundRepeat: 'repeat',
            backgroundClip: 'content-box, padding-box',
            padding: '5%',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
        }}    
    />
);

function getFront(standardCards, key) {
    return (
        <div
            style={{
                background: `url("data:image/svg+xml;base64,${standardCards[key]}")`,
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                backgroundSize: '100% 100%',
            }}    
        />
    )
}

const makeStandardDeck = (
    standardCards, // Assumed to be a JSON object with base64 encoded svgs
    back = <DefaultBack/>,
    frontStyle = {},
    getCardKey = defaultCardKey,
) => {
	const standardCard = (props) => {
		return (
            <Card
                {...props}
                front={getFront(standardCards, getCardKey(props.suit, props.rank, props.isJoker)) }
                back={props.back || back}
                frontStyle={{
                    ...frontStyle,
                    ...props.frontStyle,
                }}
            />
        );
    }

    standardCard.propTypes = {
        rank: rank.isRequired,
        suit: suit.isRequired,
        isJoker: PropTypes.bool
    };

    standardCard.defaultProps = {
        rank: 1,
        suit: 'hearts',
        isJoker: false
    };

    return standardCard;
};

export default makeStandardDeck;