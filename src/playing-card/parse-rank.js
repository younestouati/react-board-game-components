const parseRank = (rank) => {
	let r = typeof rank === 'string' ? rank.toLowerCase() : rank;

	r = r === 'ace' ? 1 : r;
	r = r === 'jack' ? 11 : r;
	r = r === 'queen' ? 12 : r;
	r = r === 'king' ? 13 : r;
    r = r === 'joker' ? 14 : r;
    
	return r || 1;
};

export {parseRank};