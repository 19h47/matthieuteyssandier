import React, { useContext, useRef, useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import styled from 'styled-components';

import { AppContext } from '../provider';

const Container = styled.div`
	will-change: clip-path;
	clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
`;

const TextInView = ({ children, className, style }) => {
	const { ready } = useContext(AppContext);
	const ref = useRef();
	const timeline = useMemo(() => gsap.timeline({ paused: true }), []);
	const [inViewRef, inView] = useInView({ triggerOnce: true });

	const setRefs = useCallback(
		node => {
			ref.current = node;
			inViewRef(node);
		},
		[inViewRef],
	);

	useEffect(() => {
		timeline.to(ref.current, {
			clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
			duration: 1.5,
			ease: 'power4.inOut',
		});
	}, [timeline, ref]);

	useEffect(() => {
		if (inView && ready) {
			timeline.play();
		}
	}, [inView, timeline, ready]);

	return (
		<Container
			className={`Text-in-view${className ? ` ${className}` : ''}`}
			style={style}
			ref={setRefs}>
			{children}
		</Container>
	);
};

TextInView.defaultProps = {
	className: '',
	style: {},
};

TextInView.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default TextInView;
