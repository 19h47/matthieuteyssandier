import React from 'react';
import styled from 'styled-components';

import SiteTitle from '../components/site-title';
import SiteDescription from '../components/site-description';
import SiteContact from '../components/site-contact';
import TextInView from '../components/text-in-view'

const Container = styled.div`
	padding-top: 34px;
	padding-bottom: 110px;
`;

const Button = styled.button`
	position: relative;
	font-size: 26px;
	z-index: 10;
`;

const Header = ({ color }) => {
	return (
		<Container className="Site-header">
			<div className="Site-container">
				<div className="row">
					<div className="col-5 col-md-3 offset-md-2">
						<SiteTitle color={color} style={{ position: 'relative', zIndex: '10' }} />
					</div>

					<div className="col-5 d-md-none text-align-right">
						<TextInView>
							<Button type="button" style={{ fontSize: '20px', textTransform: 'uppercase', lineHeight: 20 / 16, position: 'relative', zIndex: '10' }}>
								Contact
							</Button>
						</TextInView>
					</div>

					<div className="d-none d-md-block col-3">
						<SiteDescription style={{ position: 'relative', zIndex: '10' }} />
					</div>

					<div className="d-none d-md-block col-2">
						<SiteContact style={{ position: 'relative', zIndex: '10' }} />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Header;
