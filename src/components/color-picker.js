import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';

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
					}
				}
			}
		}
	`);

    return (
        <Container>
            {colors.map((color, index) => (
                <Button
                    key={caseStudies[index].node.id}
                    className="d-inline-block"
                    style={{ backgroundColor: color }}
                    type="button"
                    aria-label={parse(caseStudies[index].node.title)}></Button>
            ))}
        </Container>
    );
};

export default ColorPicker;
