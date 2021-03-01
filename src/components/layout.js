import React from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../provider';
import Header from '../components/header';
import Footer from '../components/footer';

const Layout = ({ children, color, ready }) => {

	return (
		<AppContext.Consumer>
			{context => (
				<div
					className={`global-wrapper`}
					style={{ marginTop: ready ? false : '100vh' }}
				>
					<Header color={color} />
					<main className={`Site-main`}>{children}</main>
					<Footer />
				</div>
			)
			}
		</AppContext.Consumer >
	);
};

Layout.defaultProps = {
	ready: true,
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	color: PropTypes.string.isRequired,
	ready: PropTypes.bool.isRequired,
};

export default Layout;
