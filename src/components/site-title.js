import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import parse from 'html-react-parser';
// import PropTypes from 'prop-types';

import TextInView from './text-in-view';
import ColorPicker from './ColorPicker';

const Container = styled.div`
	font-size: 26px;
	line-height: ${31.2 / 26};
`;

const SiteTitle = ({ style }) => {
	const {
		wp: {
			generalSettings: { title },
		},
	} = useStaticQuery(graphql`
		query title {
			wp {
				generalSettings {
					title
				}
			}
		}
	`);

	return (
		<Container className="d-flex align-items-center font-family-title" style={style}>
			<TextInView style={{ display: 'flex', alignItems: 'center' }}>
				<AniLink to="/" fade>{parse(title)}</AniLink>
				<ColorPicker />
				<AniLink to="/" style={{ marginLeft: '2px' }} fade>{new Date().getFullYear()}</AniLink>
			</TextInView>
		</Container>
	);
};

SiteTitle.defaultProps = {};

SiteTitle.propTypes = {};

export default SiteTitle;
