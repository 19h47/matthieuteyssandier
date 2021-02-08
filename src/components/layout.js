import React, { useState } from 'react';

import Loader from '../components/loader';
import Header from '../components/header';
import Footer from '../components/footer';

const Layout = ({ isHomePage, children, color }) => {
	const [ready, setReady] = useState(false);

	const handleReady = newReady => {
		setReady(newReady);
	};

	return (
		<div
			className={`global-wrapper${ready ? ' is-ready is-loaded' : ' is-loading'}`}
			data-is-root-path={isHomePage}
		>
			<Loader ready={ready} onComplete={handleReady} />
			<Header color={color} />

			<main>{children}</main>

			<Footer />
		</div>
	);
};

export default Layout;
