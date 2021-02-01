import React from 'react';

import SiteTitle from '../components/site-title';
import SiteDescription from '../components/site-description';
import SiteContact from '../components/site-contact';

const Header = ({ color }) => {
	return (
		<div className="Site-header">
			<div className="Site-container">
				<div className="row">
					<div className="col-5 col-md-3 offset-md-2">
						<SiteTitle color={color} />
					</div>

					<div className="col-5 d-md-none">Projets</div>

					<div className="d-none d-md-block col-3">
						<SiteDescription />
					</div>

					<div className="d-none d-md-block col-2">
						<SiteContact />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
