import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';
import styled from 'styled-components';

import TextInView from './text-in-view';

const Container = styled.div`
	font-size: 16px;
	line-height: ${24 / 16};
`;

const SiteDescription = () => {
	const {
		wp: {
			generalSettings: { description, instagram, twitter },
		},
	} = useStaticQuery(graphql`
		query description {
			wp {
				generalSettings {
					description
					instagram
					twitter
				}
			}
		}
	`);

	return (
		<Container>
			<TextInView data-scroll>{parse(description)}</TextInView>
			<TextInView>
				<a
					href={`https://instagram.com/${instagram}`}
					target="_blank"
					rel="noopener noreferrer">
					@{parse(instagram)}
				</a>
			</TextInView>
			<TextInView>
				<a
					href={`https://twitter.com/${twitter}`}
					target="_blank"
					rel="noopener noreferrer">
					@{parse(twitter)}
				</a>
			</TextInView>
		</Container>
	);
};

export default SiteDescription;
