import React, { useEffect, useRef } from 'react';
import useInView from 'react-cool-inview';
import { gsap } from 'gsap';

const TextInView = ({ children, className }) => {
	const { ref, inView } = useInView({
		trackVisibility: true,
		delay: 101,
	});
	const tl = useRef();

	useEffect(() => {
		tl.current = gsap.timeline({
			paused: true,
		});

		tl.current.fromTo(
			ref.current,
			{ 'clip-path': 'inset(0 0 100% 0)' },
			{ 'clip-path': 'inset(0 0 0% 0)', duration: 2.5, ease: 'power4.inOut' },
		);

		if (inView) {
			tl.current.play();
		} else {
			tl.current.reverse(0);
		}
	}, [inView, ref]);

	return (
		<div className={`Text-in-view${className ? ` ${className}` : ''}`} ref={ref}>
			{children}
		</div>
	);
};

export default TextInView;
