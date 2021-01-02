import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
	query {
		allWpCaseStudy {
			edges {
				node {
					title
					link
				}
			}
		}
	}
`;

const FrontPage = ({ data }) => {
    return (
        <Layout>
            <SEO title="home" />

            {data.allWpCaseStudy.edges.map(({ node }) => (
                <div key={node.slug}>
                    <Link to={node.link}>
                        <p>{node.title}</p>
                    </Link>
                </div>
            ))}
        </Layout>
    );
};

export default FrontPage;
