import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';

import { AppContext } from '../provider';

const Container = styled.div``;

const Button = styled.button`
	width: 20px;
	height: 20px;
	margin-right 2px;
	border-radius: 10px;
`;

const ColorPicker = () => {
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

	return (
		<AppContext.Consumer>
			{context => {
				const { toggleColor } = context;

				return (
					<Container>
						{colors.map((color, index) => {
							const caseStudy = caseStudies[index].node;

							return (
								<Button
									key={caseStudy.id}
									className="d-inline-block"
									style={{ backgroundColor: color }}
									type="button"
									aria-label={parse(caseStudy.title)}
									onClick={() => toggleColor(color)}
								></Button>
							)
						})}
					</Container>
				);
			}}
		</AppContext.Consumer>
	);
};

export default ColorPicker;
