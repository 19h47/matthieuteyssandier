import React, { Fragment } from 'react';
import { Link, graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

import Layout from '../components/layout';
import SEO from '../components/seo';
import NextCaseStudy from '../components/next-case-study';
import TextInView from '../components/text-in-view';

import LayoutTwoImages from '../layouts/two-images';
import LayoutImage from '../layouts/image';
import LayoutLargeImage from '../layouts/large-image';
import LayoutImageFull from '../layouts/image-full';
import LayoutImageText from '../layouts/image-text';
import LayoutVideo from '../layouts/video';

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
					... on WpCaseStudy_Customfields_Layouts_Video {
						fieldGroupName
						caption
						video {
							localFile {
								url
							}
						}
					}
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
	const { date, layouts, color } = caseStudy.customFields;

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
							<div className="col-10 col-md-2">
								{categories.length && (
									<ul className="Case-study__categories">
										{categories.map(category => (
											<li key={category.id}>{category.name}</li>
										))}
									</ul>
								)}
							</div>
							<div className="col-10 col-md-8">
								<TextInView>
									<h1 itemProp="name" className="Case-study__title">{parse(caseStudy.title)}</h1>
								</TextInView>
							</div>
							<div className="col-10 d-flex">
								<TextInView className="margin-left-auto">
									<p className="Case-study__date h1">{date}</p>
								</TextInView>
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
								{'caseStudy_Customfields_Layouts_Video' ===
									layout.fieldGroupName && (
										<LayoutVideo data={layout} color={color} />
									)}
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
