import { useStaticQuery, graphql } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';

import { AppContext } from '../provider';

const Container = styled.div`
	position: relative;
	height: 20px;
	width: 20px;
	overflow: hidden;
	margin-right: 2px;
	transition: width 1s var(--ease-out-expo);
	will-change: width;
`;

const Button = styled.button`
	width: 20px;
	height: 20px;
	border-radius: 10px;
`;

const Ul = styled.ul`
	list-style-type: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;

	li {
		display: flex;
		margin-right: 2px;

		&:last-child {
			margin-right: 0;
		}

		&:not(:first-child) {
			opacity: ${props => (props.$active ? '1' : '0')};
			transform: ${props =>
		props.$active ? 'translate3d(0,0,0)' : 'translate3d(-100%, 0, 0)'};
			will-change: opacity, transform;
			transition: opacity 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);
		}
	}
`;

const ColorPicker = () => {
	const container = useRef();
	const [active, setActive] = useState(false);

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

	const { setColor, menu, setMenu } = useContext(AppContext);

	const handleClick = color => {
		if (active) {
			setColor(color);
			setMenu(true);
		}
	};

	const handleMouseEnter = () => {
		const width = container.current.firstChild.scrollWidth;

		setActive(true);
		container.current.style.setProperty('width', `${width + 2}px`);
	};

	const handleMouseLeave = () => {
		if (false === menu) {
			setActive(false);
			container.current.style.removeProperty('width');
		}
	};

	useEffect(() => {
		if (false === menu) {
			setActive(false);
			container.current.style.removeProperty('width');
		}
	}, [menu]);

	return (
		<Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={container}>
			<Ul $active={active}>
				{colors.map((color, index) => {
					const caseStudy = caseStudies[index].node;

					return (
						<li key={caseStudy.id} style={{ transitionDelay: `${index * 0.01}s` }}>
							<Button
								className="d-inline-block"
								style={{ backgroundColor: color }}
								type="button"
								aria-label={parse(caseStudy.title)}
								onClick={() => handleClick(color)}
							/>
						</li>
					);
				})}
			</Ul>
		</Container>
	);
};

export default ColorPicker;
