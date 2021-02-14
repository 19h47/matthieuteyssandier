import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import TeaseCaseStudy from '../components/tease-case-study';

export const query = graphql`
	query {
		allWpCaseStudy {
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

const FrontPage = ({ location, data }) => {
	const colors = [
		...new Set(data.allWpCaseStudy.edges.map(({ node }) => node.customFields.color)),
	];

	const color = colors[Math.floor(Math.random() * colors.length)];

	const classNames = [
		'col-10 col-md-6',
		'col-10 col-md-4',
		'col-10 col-md-4',
		'col-10 col-md-6',
		'col-10 col-md-4',
		'col-10 col-md-8',
		'col-10 col-md-6',
		'col-10 col-md-4',
		'col-10 col-md-8 offset-md-2',
	];

	return (
		<Layout color={color} location={location} colors={colors}>
			<SEO title="home" color={color} />
			<div className="Site-container">
				<div className="row">
					{data.allWpCaseStudy.edges.map(({ node }, index) => {
						return (
							<Fragment key={`row-${index}`}>
								{2 === index && (
									<div className="col-6" key={`column-${index}`}>
										<div className="Wysiwyg">
											<p>
												Hello,
												<br />
												I’m a freelance designer based in Paris. I’m
												specialized in art direction and interactive design.
												I've gained a wealth of knowledge and expertise by
												working for clients like Veuve Clicquot, Dom
												Perignon, Chandon, Suez, Nespresso, Arte, Renault,
												Swile.
											</p>
											<p className="color-yellow-dark-grayish">
												Bonjour,
												<br />
												Je suis un designer freelance situé à Paris.À
												travers mon travail je me suis spécialisé dans la
												direction artistique et le design interactif. J'ai
												acquis mon expérience en travaillant pour des
												clients comme Veuve Clicquot, Dom Pérignon, Chandon,
												Suez, Nespresso, Arte, Renault, Swile.
											</p>
										</div>
									</div>
								)}

								{5 === index && (
									<div className="col-2" key={`text-${index}`}>
										<p>
											I’m Matthieu Teyssandier, a french desginer with 6+
											years of experience in the digital, based in Paris. I’ve
											previously worked at agencies Adveris, Pschhh, Bonhomme,
											OgilvyOne and Shiva Communication. Graduated from École
											Nationale Supérieure d’Art and IESA Multimédia.
										</p>
										<p className="color-yellow-dark-grayish">
											Je m’appelle Matthieu Teyssandier, je suis un designer
											français avec 5 années d’expériences dans le digital.
											J’ai travaillé dans diverses agences, Adveris, Pschhh,
											Bonhomme, OgilvyOne et Shiva Communication. Je suis
											diplômé de l’École Nationale Supérieure d’Art and IESA
											Multimédia.
										</p>
										<ul className="margin-top-10 list-style-type-none">
											<li>AWWWARDS (2)</li>
											<li>FWA (2)</li>
											<li>FWAWWWARDS (1)</li>
											<li>CSSDA (2)</li>
											<li>STRATEGIE (1)</li>
										</ul>
									</div>
								)}
								<div
									className={classNames[index % classNames.length]}
									key={`column-${node.slug}-${index}`}>
									<TeaseCaseStudy
										caseStudy={node}
										index={index}
										length={data.allWpCaseStudy.edges.length}
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
