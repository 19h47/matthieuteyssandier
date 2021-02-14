import React from 'react';
import useInView from 'react-cool-inview';

const TextInView = ({ children, className }) => {
	const { ref, inView } = useInView({
		unobserveOnEnter: true,
	});

	return (
		<div
			className={`Text-in-view${inView ? ' is-active' : ''}${className ? ` ${className}` : ''
				}`}
			ref={ref}>
			{children}
		</div>
	);
};

export default TextInView;
