import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const Container = styled.div`
	font-size: 26px;
	line-height: ${31.2 / 26};
`;

const Button = styled.button`
	width: 20px;
	height: 20px;
	margin-right 2px;
	border-radius: 10px;
`;

const SiteTitle = () => {
	const {
		wp: {
			generalSettings: { title },
			caseStudiesColors: { color },
		},
	} = useStaticQuery(graphql`
		query title {
			wp {
				generalSettings {
					title
				}
				caseStudiesColors {
					color
				}
			}
		}
	`);

	return (
		<Container className="d-flex align-items-center">
			<Link to="/">{parse(title)}</Link>
			<Button
				className="d-inline-block"
				style={{ backgroundColor: color }}
				type="button"
				aria-label={parse(title)}
			/>
			<Link to="/">{new Date().getFullYear()}</Link>
		</Container>
	);
};

SiteTitle.defaultProps = {};

SiteTitle.propTypes = {};

export default SiteTitle;
