import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';



export default function Home({ data }) {
    return (
        <Layout>

            <SEO title="home" />
            <h1>My WordPress Blog</h1>
            <h4>Posts</h4>
            {data.allWpCaseStudy.edges.map(({ node }) => (
                <div key={node.slug}>
                    <Link to={node.slug}>
                        <p>{node.title}</p>
                    </Link>
                </div>
            ))}
        </Layout>
    );
}
export const pageQuery = graphql`
	query {
		allWpCaseStudy {
			edges {
				node {
					title
					slug
				}
			}
		}
	}
`;
