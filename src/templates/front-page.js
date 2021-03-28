import React, { Fragment, useState } from 'react';
import { graphql } from 'gatsby';

import Loader from '../components/loader';
import Layout from '../components/layout';
import Seo from '../components/seo';
import TeaseCaseStudy from '../components/tease-case-study';
import shuffle from '../utils/shuffle';

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
					id
					title
					link
					slug
					customFields {
						date
                        color
					}
					featuredImage {
						node {
							...TeaseCaseStudyImage
						}
					}
				}
			}
		}
		caseStudiesColors: wp {
			caseStudiesColors {
				color
				colors
			}
		}
	}
`;

const FrontPage = ({ location, data }) => {
    const {
        page,
        caseStudies,
        caseStudiesColors: {
            caseStudiesColors: { colors, color },
        },
    } = data;
    const [ready, setReady] = useState(false);

    const handleReady = newReady => {
        setReady(newReady);
    };

    console.log(data);

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

    return (
        <>
            {/* <Loader ready={ready} onComplete={handleReady} colors={shuffle(colors)} /> */}
            <Layout color={color} location={location} colors={colors} ready={true}>
                <Seo title="home" color={color} />
                <div className="Site-container">
                    <div className="row">
                        {caseStudies.edges.map(({ node }, index) => {
                            return (
                                <Fragment key={`row-${index}`}>
                                    {2 === index && (
                                        <div
                                            className="col-10 col-md-6 margin-top-10 margin-top-md-0"
                                            key={`column-${index}`}>
                                            <div
                                                className="Wysiwyg"
                                                dangerouslySetInnerHTML={{ __html: page.content }}
                                            />
                                        </div>
                                    )}

                                    {5 === index && (
                                        <div
                                            className="col-10 col-md-2 margin-top-10"
                                            key={`text-${index}`}>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: page.customFields.biography,
                                                }}
                                            />
                                            {page.customFields.awards && (
                                                <ul className="margin-top-5 margin-top-md-10 list-style-type-none">
                                                    {page.customFields.awards.map(
                                                        (award, index) => (
                                                            <li
                                                                key={
                                                                    index
                                                                }>{`${award.title} (${award.value})`}</li>
                                                        ),
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                    <div
                                        className={classNames[index % classNames.length]}
                                        key={`column-${node.slug}-${index}`}>
                                        <TeaseCaseStudy
                                            ready={ready}
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
        </>
    );
};

export default FrontPage;
