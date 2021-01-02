import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';

import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
	query CaseStudyPostById(
		$id: String!
		$nextPostId: String
	) {
		# selecting the current post by id
		caseStudy: wpCaseStudy(id: { eq: $id }) {
			id
			title
			date(formatString: "MMMM DD, YYYY")

			featuredImage {
				node {
					altText
					localFile {
						childImageSharp {
							fluid(maxWidth: 1000, quality: 100) {
								...GatsbyImageSharpFluid_tracedSVG
							}
						}
					}
				}
			}
		}

		next: wpCaseStudy(id: { eq: $nextPostId }) {
			link
			title
		}
	}
`;

const CaseStudyPostTemplate = ({ data: { next, caseStudy } }) => {
	const featuredImage = {
		fluid: caseStudy.featuredImage?.node?.localFile?.childImageSharp?.fluid,
		alt: caseStudy.featuredImage?.node?.alt || ``,
	};

	return (
		<Layout>
			<SEO title={caseStudy.title} /* description={caseStudy.excerpt} */ />

			<article className="blog-post" itemScope itemType="https://schema.org/CreativeWork">
				<header>
					<h1 itemProp="name">{parse(caseStudy.title)}</h1>

					<p>{caseStudy.date}</p>

					{featuredImage?.fluid && (
						<Image
							fluid={featuredImage.fluid}
							alt={featuredImage.alt}
							style={{ marginBottom: 50 }}
						/>
					)}
				</header>

			</article>

			<nav className="blog-post-nav">
				<Link to={next.link} rel="next">
					{parse(next.title)} →
				</Link>
			</nav>
		</Layout>
	);
};

export default CaseStudyPostTemplate;
