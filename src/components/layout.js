import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Header from '../components/header';
import Footer from '../components/footer';
import Menu from '../components/Menu';

import '../stylesheets/styles.scss';

const Layout = ({ children, ready }) => {
	const {
		wp: {
			caseStudiesColors: { color },
		},
		allWpCaseStudy: { edges: caseStudies }
	} = useStaticQuery(graphql`
		query color {
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
		<div className={`global-wrapper`}>
			<Header color={color} />
			<Menu caseStudies={caseStudies} />
			<main className={`Site-main`}>{children}</main>
			<Footer />
		</div>
	);
};

Layout.defaultProps = {
	ready: true,
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	ready: PropTypes.bool.isRequired,
};

export default Layout;
