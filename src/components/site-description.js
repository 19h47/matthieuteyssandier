

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';

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
            {parse(description)}<br />
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
                @{parse(instagram)}
            </a>< br />
            <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
                @{parse(twitter)}
            </a>
        </div>
    )
}

export default SiteDescription