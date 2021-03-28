/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */
module.exports = {
	flags: {
		PRESERVE_WEBPACK_CACHE: true,
	},

	/**
	 * Adding plugins to this array adds them to your Gatsby site.
	 *
	 * Gatsby has a rich ecosystem of plugins.
	 * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
	 */
	plugins: [
		'gatsby-plugin-layout',
		`gatsby-plugin-styled-components`,
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				url: process.env.WPGRAPHQL_URL || 'https://wp.matthieuteyssandier.com/graphql',
			},
		},
		/**
		 * We need this plugin so that it adds the "File.publicURL" to our site
		 * It will allow us to access static url's for assets like PDF's
		 *
		 * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
		 */
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `assets`,
				path: `${__dirname}/content/assets`,
			},
		},
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'GatsbyJS',
				short_name: 'GatsbyJS',
				icon: 'src/images/icon.png',
				start_url: '/',
				background_color: '#f7f0eb',
				theme_color: '#a2466c',
				display: 'standalone',
			},
		},
		`gatsby-plugin-react-helmet`,
		'gatsby-plugin-offline',
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-react-svg`,
			options: {
				rule: {
					include: /\.inline\.svg$/,
				},
			},
		},
	],
};
