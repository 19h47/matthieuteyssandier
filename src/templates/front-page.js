import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import TeaseCaseStudy from '../components/tease-case-study';

export const query = graphql`
	query frontPage($id: String!) {
		page: wpPage(id: { eq: $id }) {
			content
            customFields {
                biography
                awards {
                    title
                    value
                }
            }
		}
		caseStudies: allWpCaseStudy {
			edges {
				node {
					title
					link
					slug
					customFields {
						date
						color
					}
					featuredImage {
						node {
							...FeaturedImage
						}
					}
				}
			}
		}
	}
`;

const FrontPage = ({ location, data }) => {
    const { page, caseStudies } = data;
    const colors = [...new Set(caseStudies.edges.map(({ node }) => node.customFields.color))];

    const color = colors[Math.floor(Math.random() * colors.length)];

    const classNames = [
        'col-10 col-md-6',
        'col-10 col-md-4',
        'col-10 col-md-4 margin-top-10 margin-top-md-0',
        'col-10 col-md-6',
        'col-10 col-md-4',
        'col-10 col-md-8 margin-top-10',
        'col-10 col-md-6',
        'col-10 col-md-4',
        'col-10 col-md-8 offset-md-2',
    ];

    console.log(data);

    return (
        <Layout color={color} location={location} colors={colors}>
            <SEO title="home" color={color} />
            <div className="Site-container">
                <div className="row">
                    {caseStudies.edges.map(({ node }, index) => {
                        return (
                            <Fragment key={`row-${index}`}>
                                {2 === index && (
                                    <div className="col-10 col-md-6 margin-top-10 margin-top-md-0" key={`column-${index}`}>
                                        <div
                                            className="Wysiwyg"
                                            dangerouslySetInnerHTML={{ __html: page.content }}
                                        />
                                    </div>
                                )}

                                {5 === index && (
                                    <div className="col-10 col-md-2 margin-top-10" key={`text-${index}`}>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: page.customFields.biography,
                                            }}
                                        />
                                        {page.customFields.awards && (

                                            <ul className="margin-top-5 margin-top-md-10 list-style-type-none">
                                                {page.customFields.awards.map((award, index) => (<li key={index}>{`${award.title} (${award.value})`}</li>))}
                                            </ul>

                                        )}
                                    </div>
                                )}
                                <div
                                    className={classNames[index % classNames.length]}
                                    key={`column-${node.slug}-${index}`}>
                                    <TeaseCaseStudy
                                        caseStudy={node}
                                        index={index}
                                        length={caseStudies.edges.length}
                                    />
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default FrontPage;
