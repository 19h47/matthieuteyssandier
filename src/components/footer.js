import React from 'react';

import SiteTitle from '../components/site-title';
import SiteDescription from '../components/site-description';
import SiteContact from '../components/site-contact';

const Footer = () => {
	return (
		<div className="Site-footer">
			<div className="Site-container">
				<div className="row">
					<div className="col-12 col-md-3 offset-md-2">
						<SiteTitle />
					</div>
					<div className="col-12 col-md-3">
						<SiteDescription />
					</div>
					<div className="col-12 col-md-2">
						<SiteContact />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
