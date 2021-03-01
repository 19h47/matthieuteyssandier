import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';
import styled from 'styled-components';

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

const SiteTitle = ({ color }) => {
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

export default SiteTitle;
