import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';

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
        <div className="Site-title">
            <Link to="/">{parse(title)}</Link>
            <button style={{ backgroundColor: color }} type="button" />
            <Link to="/">{new Date().getFullYear()}</Link>
        </div>
    );
};

export default SiteTitle;
