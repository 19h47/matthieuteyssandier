const path = require(`path`);

exports.createPages = async gatsbyUtilities => {
	const caseStudies = await getCaseStudies(gatsbyUtilities);
	const pages = await getPages(gatsbyUtilities);

	await createIndividualCaseStudy({ caseStudies, gatsbyUtilities });
	await createIndividualPage({ pages, gatsbyUtilities });
};

const createIndividualCaseStudy = async ({ caseStudies, gatsbyUtilities }) => {
	return Promise.all(
		caseStudies.map(({ caseStudy, next }) => {
			return gatsbyUtilities.actions.createPage({
				path: caseStudy.uri,
				component: path.resolve(`./src/templates/case-study-post.js`),
				context: {
					id: caseStudy.id,
					nextPostId: next ? next.id : caseStudies[0].caseStudy.id,
				},
			});
		}),
	);
};

const createIndividualPage = async ({ pages, gatsbyUtilities }) => {
	return Promise.all(
		pages.map(({ page }) => {
			return gatsbyUtilities.actions.createPage({
				path: page.uri,
				component: page.isFrontPage ? path.resolve(`./src/templates/front-page.js`) : path.resolve(`./src/pages/index.js`),
				context: {
					id: page.id
				}
			})
		})
	)
};

const getPages = async ({ graphql, reporter }) => {
	const graphqlResult = await graphql(`
		query WpPages {
			allWpPage {
				edges {
					page: node {
						id
						uri
						isFrontPage
					}
				}
			}
		}
	`);

	if (graphqlResult.errors) {
		reporter.panicOnBuild(
			`There was an error loading your pages`,
			graphqlResult.errors,
		);
		return;
	}

	return graphqlResult.data.allWpPage.edges;
}

const getCaseStudies = async ({ graphql, reporter }) => {
	const graphqlResult = await graphql(/* GraphQL */ `
		query WpCaseStudies {
			# Query all WordPress blog posts sorted by date
			allWpCaseStudy(sort: { fields: [date], order: DESC }) {
				edges {
					# note: this is a GraphQL alias. It renames "node" to "post" for this query
					# We're doing this because this "node" is a post! It makes our code more readable further down the line.
					caseStudy: node {
						id
						uri
					}

					next {
						id
					}
				}
			}
		}
	`);

	if (graphqlResult.errors) {
		reporter.panicOnBuild(
			`There was an error loading your case study posts`,
			graphqlResult.errors,
		);
		return;
	}

	return graphqlResult.data.allWpCaseStudy.edges;
}
