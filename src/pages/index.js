import React from 'react';
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

const FrontPage = ({ data }) => {
	const colors = [
		...new Set(data.allWpCaseStudy.edges.map(({ node }) => node.customFields.color)),
	];

	const classNames = [
		'col-6',
		'col-4',
		'col-4',
		'col-6',
		'col-4',
		'col-8',
		'col-6',
		'col-4',
		'col-8 offset-2',
	];

	return (
		<Layout color={colors[Math.floor(Math.random() * colors.length)]}>
			<SEO title="home" />
			<div className="Site-container">
				<div className="row">
					{data.allWpCaseStudy.edges.map(({ node }, index) => {
						return (
							<>
								{2 === index && (
									<div className="col-6">
										<p>
											Hello,
											<br />
											I’m a freelance designer based in Paris.I’m specialized
											in art direction and interactive design. I've gained a
											wealth of knowledge and expertise by working for clients
											like Veuve Clicquot, Dom Perignon, Chandon, Suez,
											Nespresso, Arte, Renault, Swile.
										</p>
										<p>
											Bonjour,
											<br />
											Je suis un designer freelance situé à Paris.À travers
											mon travail je me suis spécialisé dans la direction
											artistique et le design interactif. J'ai acquis mon
											expérience en travaillant pour des clients comme Veuve
											Clicquot, Dom Pérignon, Chandon, Suez, Nespresso, Arte,
											Renault, Swile.
										</p>
									</div>
								)}

								{5 === index && (
									<div className="col-2">
										<p>
											I’m Matthieu Teyssandier, a french desginer with 6+
											years of experience in the digital, based in Paris. I’ve
											previously worked at agencies Adveris, Pschhh, Bonhomme,
											OgilvyOne and Shiva Communication. Graduated from École
											Nationale Supérieure d’Art and IESA Multimédia.
										</p>
										<p>
											Je m’appelle Matthieu Teyssandier, je suis un designer
											français avec 5 années d’expériences dans le digital.
											J’ai travaillé dans diverses agences, Adveris, Pschhh,
											Bonhomme, OgilvyOne et Shiva Communication. Je suis
											diplômé de l’École Nationale Supérieure d’Art and IESA
											Multimédia.
										</p>
										<ul>
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
									key={node.slug}>
									<TeaseCaseStudy
										caseStudy={node}
										index={index}
										length={data.allWpCaseStudy.edges.length}
									/>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export default FrontPage;
