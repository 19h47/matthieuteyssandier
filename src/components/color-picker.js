import { useStaticQuery, graphql } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { gsap } from 'gsap';

import { AppContext } from '../provider';

const Container = styled.div`
	position: relative;
	height: 20px;
	/* width: 20px; */
	overflow: hidden;
	/* transition: width ${props => props.$length * 0.1}s var(--ease-out-expo); */
	/* will-change: width; */
`;

const Ul = styled.ul`
	list-style-type: none;
	/* position: absolute;
	top: 0;
	bottom: 0;
	left: 0; */
	display: flex;
`;

const Li = styled.li`
	/* display: flex; */
	margin-right: 2px;
	z-index: ${props => (props.$length - props.$index).toString()};

	&:last-child {
		margin-right: 0;
	}

	/* &:not(:first-child) {
		transform: ${props =>
		props.$active
			? 'translate3d(0,0,0)'
			: `translate3d(calc(${props.$index * -100}% - ${2 * props.$index}px), 0, 0)`};
		will-change: transform;
		transition: transform 0.5s var(--ease-out-expo)
			${props => (props.$length - props.$index) * 0.1}s;
	} */
`;

const Button = styled.button`
	width: 20px;
	height: 20px;
	border-radius: 10px;
`;

const ColorPicker = () => {
	const container = useRef();
	const { setColor, menu, setMenu } = useContext(AppContext);
	const [active, setActive] = useState(false);
	const tl = useRef(null);

	const {
		wp: {
			caseStudiesColors: { colors },
		},
		allWpCaseStudy: { edges: caseStudies },
	} = useStaticQuery(graphql`
		query colors {
			wp {
				caseStudiesColors {
					colors
				}
			}

			allWpCaseStudy {
				edges {
					node {
						id
						title
						customFields {
							color
						}
					}
				}
			}
		}
	`);

	const handleClick = color => {
		if (active) {
			setColor(color);
			setMenu(true);
		}
	};

	const handleMouseEnter = () => {
		setActive(true);
		tl.current.timeScale(1);
		tl.current.play();
	};

	const handleMouseLeave = () => {
		if (false === menu) {
			setActive(false);
			tl.current.timeScale(1.25);
			tl.current.reverse();
		}
	};

	useEffect(() => {
		if (false === menu && tl.current) {
			setActive(false);
			tl.current.timeScale(1.25);
			tl.current.reverse();
		}
	}, [menu]);

	useEffect(() => {
		const { children } = container.current.firstChild;
		const width = (children.length * 20) + ((children.length - 1) * 2);


		tl.current = gsap.timeline({ paused: true });

		tl.current.fromTo(
			container.current,
			{ width: '20px' },
			{
				duration: colors.length * 0.1,
				width,
				ease: 'power4.inOut'
			},
		);
		tl.current.fromTo(
			children,
			{
				x: index => ((children[index].scrollWidth * index) + (index * 2)) * -1,
			},
			{ stagger: index => (colors.length - index) * 0.1, x: 0, ease: 'power4.inOut', duration: 0.5 },
			`-=${colors.length * 0.1}`
		);
	}, []);

	// props.$length - props.$index) * 0.1

	return (
		<Container
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={container}
			$length={colors.length}>
			<Ul>
				{colors.map((color, index) => {
					const caseStudy = caseStudies[index].node;

					return (
						<Li
							key={caseStudy.id}
							$active={active}
							$index={index}
							$length={colors.length}>
							<Button
								className="d-block"
								style={{ backgroundColor: color }}
								type="button"
								aria-label={parse(caseStudy.title)}
								onClick={() => handleClick(color)}
							/>
						</Li>
					);
				})}
			</Ul>
		</Container>
	);
};

export default ColorPicker;
