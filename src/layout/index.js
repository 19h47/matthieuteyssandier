import React, { useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Header from '../components/header';
import Menu from '../components/Menu';
import Loader from '../components/loader';

import shuffle from '../utils/shuffle';

const Layout = ({ children }) => {

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const {
		wp: {
			caseStudiesColors: { color, colors },
		},
		allWpCaseStudy: { edges: caseStudies },
	} = useStaticQuery(graphql`
		query colorAndCaseStudies {
			wp {
				caseStudiesColors {
					color
					colors
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
			<Loader colors={shuffle(colors)} />
			<Menu caseStudies={caseStudies} />
			{children}
		</>
	);
};

export default Layout;
