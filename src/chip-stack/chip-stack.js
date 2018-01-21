import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './chip-stack.css';

class ChipStack extends Component {
	render() {
		const {children} = this.props;
		const offset = children.length > 5 ? 1 : 2;

		return (
			<div className="item-stack" style={{width: '100px', height: '100px', display: 'inline-block', margin: '15px'}}>
			{
				React.Children.map(children, (child, i) => {
					return (
						<div className="stack-item" style={{left: (i*offset) + 'px', top: (i*offset) + 'px'}}>
							{child}
						</div>
					);
				})
			}
			</div>
		);
	}
}

//TODO: VERIFY THAT THESE ARE CHIPS!
//TODO: ALLOW STACK TO DETERMINE THE RADIUS OF THEM ALL
ChipStack.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

ChipStack.defaultProps = {
};

export default ChipStack;
