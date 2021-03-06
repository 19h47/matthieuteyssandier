import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import parse from 'html-react-parser';
// import PropTypes from 'prop-types';

import ColorPicker from './color-picker';

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
		<Container className="d-flex align-items-center" style={style}>
			<Link to="/">{parse(title)}</Link>
			<ColorPicker />
			<Link to="/">{new Date().getFullYear()}</Link>
		</Container>
	);
};

SiteTitle.defaultProps = {};

SiteTitle.propTypes = {};

export default SiteTitle;
