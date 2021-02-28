import React, { useState, useLayoutEffect } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import PropTypes from 'prop-types';
import uniqueId from 'lodash.uniqueid'

const TextInView = ({ children, className, ready }) => {
	const [id] = useState(uniqueId('text-in-view-'))
	const { scroll } = useLocomotiveScroll();

	useLayoutEffect(() => {
		if (scroll && ready) {
			scroll.on('call', ([name, callId]) => {
				if (name === 'inView' && id === callId) {
				}
			});
		}
	}, [scroll, ready, id]);

	return (
		<div id={id} className={`Text-in-view${className ? ` ${className}` : ''}`} data-scroll data-scroll-call={`inview,${id}`}>
			{children}
		</div>
	);
};

TextInView.defaultProps = {
	className: '',
	ready: true
};

TextInView.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	ready: PropTypes.bool
};

export default TextInView;
