import React from 'react';

import TextInView from './text-in-view';
import SiteDescription from '../components/site-description';
import SiteContact from '../components/site-contact';

const Footer = () => {
	return (
		<div className="Site-footer">
			<div className="Site-container">
				<div className="row">
					<div className="col-12 col-md-3 offset-md-2">
						<TextInView className="Site-footer__copyright">
							Dev by <a href="https://19h47.fr" target="_blank" rel="noopener noreferrer">19h47</a>
						</TextInView>
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
