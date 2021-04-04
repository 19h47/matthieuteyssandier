import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Header from '../components/header';
import Menu from '../components/Menu';

const Layout = ({ children }) => {
	const {
		wp: {
			caseStudiesColors: { color },
		},
		allWpCaseStudy: { edges: caseStudies },
	} = useStaticQuery(graphql`
		query colorAndCaseStudies {
			wp {
				caseStudiesColors {
					color
				}
			}
            allWpCaseStudy {
				edges {
					node {
						id
						title
						link
						slug
						customFields {
							date
							color
						}
						featuredImage {
							node {
								...TeaseCaseStudyImageMenu
							}
						}
						categories: caseStudyCategories {
							nodes {
								id
								name
							}
						}
					}
				}
			}
		}
	`);

	return (
		<>
			<Header color={color} />
			<Menu caseStudies={caseStudies} />
			{children}
		</>
	);
};

export default Layout;
