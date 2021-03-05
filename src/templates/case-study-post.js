import React, { Fragment } from 'react';
import { Link, graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

import Layout from '../components/layout';
import SEO from '../components/seo';
import NextCaseStudy from '../components/next-case-study';

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
					...FeaturedImage
				}
			}
		}
	}
`;

const CaseStudyPostTemplate = ({ location, data: { next, caseStudy } }) => {
	const categories = caseStudy.categories?.nodes;
	const { date, layouts } = caseStudy.customFields;

	const nextCaseStudy = {
		image: getImage(next.featuredImage.node.localFile),
		alt: next.featuredImage?.node?.alt || next.title,
		color: next.customFields?.color,
		link: next.link,
		title: next.title,
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
				</header>

				<div className="Layouts">
					{layouts.map((layout, index) => {
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
						<NextCaseStudy {...nextCaseStudy} />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CaseStudyPostTemplate;
