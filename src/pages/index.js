import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';

import ArrowRight from '../assets/arrow-right.inline.svg';

export const query = graphql`
	query {
		allWpCaseStudy {
			edges {
				node {
					title
					link
					customFields {
						date
					}
					featuredImage {
						node {
							altText
							localFile {
								childImageSharp {
									fluid(maxWidth: 1420, quality: 100) {
										...GatsbyImageSharpFluid_withWebp
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

const FrontPage = ({ data }) => {
    return (
        <Layout>
            <SEO title="home" />

            {data.allWpCaseStudy.edges.map(({ node }, index) => {
                const featuredImage = {
                    fluid: node.featuredImage?.node?.localFile?.childImageSharp?.fluid,
                    alt: node.featuredImage?.node?.alt || ``,
                };

                return (
                    <div key={node.slug}>
                        {featuredImage?.fluid && (
                            <Image fluid={featuredImage.fluid} alt={featuredImage.alt} />
                        )}
                        <Link to={node.link}>
                            <h2 className="h1">
                                {index + 1}&nbsp;&mdash;&nbsp;{data.allWpCaseStudy.edges.length}{' '}
                                {node.title}
                                <br />
                                {node.customFields.date}
                                <ArrowRight />
                            </h2>
                        </Link>
                    </div>
                );
            })}
        </Layout>
    );
};

export default FrontPage;
