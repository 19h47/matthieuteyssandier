import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';

import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
	query CaseStudyPostById($id: String!, $nextPostId: String) {
		# selecting the current post by id
		caseStudy: wpCaseStudy(id: { eq: $id }) {
			id
			title
			featuredImage {
				node {
					altText
					localFile {
						childImageSharp {
							fluid(maxWidth: 1000, quality: 100) {
								...GatsbyImageSharpFluid_withWebp
							}
						}
					}
				}
			}
		}

		next: wpCaseStudy(id: { eq: $nextPostId }) {
			link
			customFields {
				color
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
`;

const CaseStudyPostTemplate = ({ data: { next, caseStudy } }) => {
	const featuredImage = {
		fluid: caseStudy.featuredImage?.node?.localFile?.childImageSharp?.fluid,
		alt: caseStudy.featuredImage?.node?.alt || ``,
	};

	const nextFeaturedImage = {
		fluid: next.featuredImage?.node?.localFile?.childImageSharp?.fluid,
		alt: next.featuredImage?.node?.alt || ``,
	};

	return (
		<Layout>
			<SEO title={caseStudy.title} /* description={caseStudy.excerpt} */ />

			<article className="blog-post" itemScope itemType="https://schema.org/CreativeWork">
				<header>
					<div className="Site-container">
						<div className="row">
							<div className="col-10">
								<h1 itemProp="name">{parse(caseStudy.title)}</h1>
							</div>
						</div>
					</div>

					{featuredImage?.fluid && (
						<Image
							fluid={featuredImage.fluid}
							alt={featuredImage.alt}
							style={{ marginBottom: 50 }}
						/>
					)}
				</header>
			</article>

			<div className="Site-container">
				<div className="row">
					<div className="col-2">
						<Link to={next.link} rel="next" className="h1 margin-0">
							Next
							<br />
							<span className="color-yellow-dark-grayish">Suivant</span>
						</Link>
					</div>
					<div className="col-8">
						<Link
							className="Next"
							to={next.link}
							rel="next"
							style={{ backgroundColor: next.customFields.color }}>


							{nextFeaturedImage?.fluid && (
								<Image
									fluid={nextFeaturedImage.fluid}
									alt={nextFeaturedImage.alt}
									style={{ height: '100%' }}
								/>
							)}
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CaseStudyPostTemplate;
