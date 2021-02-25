import React, { Fragment } from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import parse from 'html-react-parser';

import Layout from '../components/layout';
import SEO from '../components/seo';

import LayoutTwoImages from '../layouts/two-images';
import LayoutImage from '../layouts/image';
import LayoutLargeImage from '../layouts/large-image';
import LayoutImageFull from '../layouts/image-full';
import LayoutImageText from '../layouts/image-text';

export const query = graphql`
	query CaseStudyPostById($id: String!, $nextPostId: String) {
		# selecting the current post by id
		caseStudy: wpCaseStudy(id: { eq: $id }) {
			id
			title
			categories: caseStudyCategories {
				nodes {
					id
					name
				}
			}
			featuredImage {
				node {
					...FeaturedImage
				}
			}
			customFields {
				color
				date
				content {
					english
					french
				}
				layouts {
					... on WpCaseStudy_Customfields_Layouts_TwoImages {
						fieldGroupName
						item0 {
							image {
								...FeaturedImage
							}
							caption
						}
						item1 {
							image {
								...FeaturedImage
							}
							caption
						}
					}
					... on WpCaseStudy_Customfields_Layouts_Image {
						fieldGroupName
						image {
							...FeaturedImage
						}
						caption
					}
					... on WpCaseStudy_Customfields_Layouts_LargeImage {
						fieldGroupName
						video {
							localFile {
								url
							}
						}
						image {
							...FeaturedImage
						}
						caption
					}
					... on WpCaseStudy_Customfields_Layouts_ImageFull {
						fieldGroupName
						video {
							localFile {
								url
							}
						}
						image {
							...FeaturedImage
						}
						caption
					}
					... on WpCaseStudy_Customfields_Layouts_ImageText {
						fieldGroupName
						caption
						video {
							localFile {
								url
							}
						}
						image {
							...FeaturedImage
						}
						content {
							english
							french
						}
					}
				}
			}
		}

		next: wpCaseStudy(id: { eq: $nextPostId }) {
			title
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

const CaseStudyPostTemplate = ({ location, data: { next, caseStudy } }) => {
	const featuredImage = {
		fluid: caseStudy.featuredImage?.node?.localFile?.childImageSharp?.fluid,
		alt: caseStudy.featuredImage?.node?.alt || ``,
	};

	const categories = caseStudy.categories?.nodes;

	const { date, content, layouts } = caseStudy.customFields;

	const nextCaseStudy = {
		image: {
			fluid: next.featuredImage?.node?.localFile?.childImageSharp?.fluid,
			alt: next.featuredImage?.node?.alt || next.title,
		},
		color: next.customFields?.color,
	};

	return (
		<Layout location={location}>
			<SEO title={caseStudy.title} /* description={caseStudy.excerpt} */ />

			<article className="Case-study" itemScope itemType="https://schema.org/CreativeWork">
				<header>
					<div className="Site-container">
						<div className="row">
							<div className="col-10 col-md-1">
								{categories.map(category => (
									<p key={category.id}>{category.name}</p>
								))}
							</div>
							<div className="col-10 col-md-8 offset-md-1">
								<h1 itemProp="name">{parse(caseStudy.title)}</h1>
							</div>
							<div className="col-10 d-flex">
								<p className="Case-study__date margin-left-auto h1">{date}</p>
							</div>
						</div>
					</div>

					{/* <div
						dangerouslySetInnerHTML={{
							__html: content.english,
						}}
					/>
					<div
						dangerouslySetInnerHTML={{
							__html: content.french,
						}}
					/> */}
					{/* 
					{featuredImage?.fluid && (
						<Image
							fluid={featuredImage.fluid}
							alt={featuredImage.alt}
							style={{ marginBottom: 50 }}
							backgroundColor={caseStudy.customFields.color}
							durationFadeIn={1800}
						/>
					)} */}
				</header>

				<div className="Layouts">
					{layouts.map((layout, index) => {
						console.log(layout)
						return (
							<Fragment key={`${layout.fieldGroupName}-${index}`}>
								{'caseStudy_Customfields_Layouts_TwoImages' ===
									layout.fieldGroupName && <LayoutTwoImages data={layout} />}
								{'caseStudy_Customfields_Layouts_Image' ===
									layout.fieldGroupName && <LayoutImage data={layout} />}
								{'caseStudy_Customfields_Layouts_LargeImage' ===
									layout.fieldGroupName && <LayoutLargeImage data={layout} />}
								{'caseStudy_Customfields_Layouts_ImageFull' ===
									layout.fieldGroupName && <LayoutImageFull data={layout} />}
								{'caseStudy_Customfields_Layouts_ImageText' ===
									layout.fieldGroupName && <LayoutImageText data={layout} />}
							</Fragment>
						);
					})}
				</div>
			</article>

			<div className="Site-container">
				<div className="row">
					<div className="col-10 col-md-2">
						<Link to={next.link} rel="next" className="h1 margin-0">
							Next
							<br />
							<span className="color-yellow-dark-grayish">Suivant</span>
						</Link>
					</div>
					<div className="col-10 col-md-8">
						<Link
							className="Next-case-study"
							to={next.link}
							rel="next"
							style={{ backgroundColor: nextCaseStudy.color }}>
							<svg viewBox="0 0 600 600" preserveAspectRatio="none">
								<g>
									<path
										fill={nextCaseStudy.color}
										d="M-50-50v700h700V-50H-50z M300,600C134.3,600,0,465.7,0,300S134.3,0,300,0s300,134.3,300,300S465.7,600,300,600z"
									/>
								</g>
							</svg>
							{nextCaseStudy.image.fluid && (
								<Image
									fluid={nextCaseStudy.image.fluid}
									alt={nextCaseStudy.image.alt}
									style={{ height: '100%' }}
									backgroundColor={nextCaseStudy.color}
									durationFadeIn={1800}
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
