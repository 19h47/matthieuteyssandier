import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import TextInView from './text-in-view';

const Container = styled.div`
	font-size: 16px;
	line-height: ${24 / 16};
`;

const SiteContact = () => {
	const {
		wp: {
			generalSettings: { publicEmail },
		},
	} = useStaticQuery(graphql`
		query contact {
			wp {
				generalSettings {
					publicEmail
				}
			}
		}
	`);

	return (
		<Container>
			<TextInView>Drop me a line for freelance work</TextInView>
			<TextInView>
				<a href={`mailto:${parse(publicEmail)}`}>{parse(publicEmail)}</a>
			</TextInView>
			<TextInView>Available in Freelance</TextInView>
		</Container>
	);
};

SiteContact.defaultProps = {};

SiteContact.propTypes = {};

export default SiteContact;
