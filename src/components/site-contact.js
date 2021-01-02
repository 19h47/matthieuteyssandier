import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';

const SiteDescription = () => {
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
            Drop me a line for freelance work<br />
            <a href={`mailto:${parse(publicEmail)}`}>
                {parse(publicEmail)}
            </a><br />
            Available in Freelance
        </div>
    )
}

export default SiteDescription