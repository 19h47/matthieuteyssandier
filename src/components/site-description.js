import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';

import TextInView from './text-in-view';

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
		<div className="Site-description">
			<TextInView>{parse(description)}</TextInView>
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
		</div>
	);
};

export default SiteDescription;
