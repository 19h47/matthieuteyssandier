import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';

import TextInView from './text-in-view';

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
		<div className="Site-contact">
			<TextInView>Drop me a line for freelance work</TextInView>
			<TextInView><a href={`mailto:${parse(publicEmail)}`}>{parse(publicEmail)}</a></TextInView>
			<TextInView>Available in Freelance</TextInView>
		</div>
	);
};

export default SiteContact;
