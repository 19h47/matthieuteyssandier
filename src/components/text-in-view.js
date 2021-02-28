import React from 'react';
import PropTypes from 'prop-types';

const TextInView = ({ children, className }) => {
	return (
		<div className={`Text-in-view${className ? ` ${className}` : ''}`} data-scroll>
			{children}
		</div>
	);
};

TextInView.defaultProps = {
	className: '',
};

TextInView.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default TextInView;
