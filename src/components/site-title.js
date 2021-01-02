import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';

const SiteTitle = () => {
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
        <Link className="Site-title" to="/">
            {parse(title)}©{new Date().getFullYear()}
        </Link>
    )
}

export default SiteTitle