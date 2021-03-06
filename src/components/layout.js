import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';


import Header from '../components/header';
import Footer from '../components/footer';
import Menu from '../components/menu';

import '../stylesheets/styles.scss';

const Layout = ({ children, ready }) => {
	const {
		wp: {
			caseStudiesColors: { color },
		},
	} = useStaticQuery(graphql`
		query color {
			wp {
				caseStudiesColors {
					color
				}
			}
		}
	`);

	return (



		<div className={`global-wrapper`} style={{ marginTop: ready ? false : '100vh' }}>
			<Header color={color} />
			<Menu />
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
