import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

const Layout = ({ children, color }) => {
	return (
		<div className={`global-wrapper`} data-scroll-section>
			<Header color={color} />

			<main className={`Site-main`}>
				{children}
			</main>

			<Footer />
		</div>
	);
};

export default Layout;
