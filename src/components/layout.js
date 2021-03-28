import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../components/footer';


import '../stylesheets/styles.scss';

const Layout = ({ children, ready }) => {
	return (
		<div className={`global-wrapper`}>
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
