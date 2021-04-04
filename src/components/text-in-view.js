import React, { useRef, useEffect, useMemo } from 'react';
import useInView from 'react-cool-inview';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const TextInView = ({ children, className, style }) => {
	const ref = useRef(0);
	const timeline = useMemo(() => gsap.timeline({ paused: true }), []);

	const { observe } = useInView({
		onEnter: ({ unobserve }) => {
			timeline.play();
			unobserve();
		},
	});

	useEffect(() => {
		timeline.fromTo(
			ref.current,
			{ clipPath: 'inset(0 0 100% 0)' },
			{ clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power4.inOut' },
		);
	}, [timeline]);

	return (
		<div
			className={`Text-in-view${className ? ` ${className}` : ''}`}
			style={style}
			ref={el => {
				observe(el);
				ref.current = el;
			}}>
			{children}
		</div>
	);
};

TextInView.defaultProps = {
	className: '',
	style: {}
};

TextInView.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default TextInView;
