import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

const Layout = ({ isHomePage, children }) => {
	return (
		<div className="global-wrapper" data-is-root-path={isHomePage}>
			<Header />

			<main>{children}</main>

			<Footer />
		</div>
	);
};

export default Layout;
