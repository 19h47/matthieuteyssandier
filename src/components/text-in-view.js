import React, { useRef, useEffect } from 'react';
import useInView from 'react-cool-inview';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const TextInView = ({ children, className }) => {
	const tl = useRef();

	const { ref } = useInView({
		onEnter: ({ unobserve }) => {
			tl.current.play();
			unobserve();
		},
	});

	useEffect(() => {
		tl.current = gsap.timeline({
			paused: true,
		});

		tl.current.fromTo(
			ref.current,
			{ clipPath: 'inset(0 0 100% 0)' },
			{ clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power4.inOut' },
		);
	}, [ref]);

	return (
		<div className={`Text-in-view${className ? ` ${className}` : ''}`} ref={ref}>
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
