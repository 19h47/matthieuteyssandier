import React, { useState } from 'react';
import { withPrefix } from 'gatsby';

import Loader from '../components/loader';
import Header from '../components/header';
import Footer from '../components/footer';

const Layout = ({ children, color, location }) => {
	const isHomePage = location.pathname === withPrefix('/');
	const [ready, setReady] = useState(false);

	const handleReady = newReady => {
		setReady(newReady);
	};

	return (
		<div className="global-wrapper">
			<Header color={color} />

			{isHomePage ? <Loader ready={ready} onComplete={handleReady} /> : ''}

			<main
				className={`Site-main${ready && isHomePage ? ' is-ready is-loaded' : isHomePage ? ' is-loading' : ''
					}`}>
				{children}
			</main>

			<Footer />
		</div>
	);
};

export default Layout;
