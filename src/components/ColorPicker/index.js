import { useStaticQuery, graphql } from 'gatsby';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import parse from 'html-react-parser';
import { gsap } from 'gsap';

import { Container, Ul, Li, Button } from './style.js';
import { AppContext } from '../../provider';

const ColorPicker = () => {
	const container = useRef();
	const { setPosition, setColor, menu, setMenu } = useContext(AppContext);
	const [active, setActive] = useState(false);
	const timeline = useMemo(
		() => gsap.timeline({ paused: true, defaults: { ease: 'power4.inOut' } }),
		[],
	);

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

	const handleClick = (event, color) => {
		if (active) {
			setColor(color);
			setPosition({ x: event.clientX, y: event.clientY });
			setMenu(true);
		}
	};

	const handleMouseEnter = () => {
		setActive(true);
		timeline.timeScale(1);
		timeline.play();
	};

	const handleMouseLeave = () => {
		if (false === menu) {
			setActive(false);
			timeline.timeScale(1.25);
			timeline.reverse();
		}
	};

	useEffect(() => {
		if (false === menu && timeline) {
			setActive(false);
			timeline.timeScale(1.25);

			gsap.delayedCall(1.5, () => timeline.reverse());
		}
	}, [menu, timeline]);

	useEffect(() => {
		const { children } = container.current.firstChild;
		const width = children.length * 20 + (children.length - 1) * 2;

		timeline.fromTo(
			container.current,
			{ width: '20px' },
			{
				duration: children.length * 0.1,
				width,
			},
		);
		timeline.fromTo(
			children,
			{
				x: index => (20 * index + 2 * index) * -1, // widths + margins
			},
			{
				stagger: index => (children.length - index) * 0.1,
				x: 0,
				duration: 0.5,
			},
			`-=${(children.length - 1) * 0.1}`,
		);
	}, [timeline]);

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
								$backgroundColor={color}
								type="button"
								aria-label={parse(caseStudy.title)}
								onClick={event => handleClick(event, color)}
							/>
						</Li>
					);
				})}
			</Ul>
		</Container>
	);
};

export default ColorPicker;
