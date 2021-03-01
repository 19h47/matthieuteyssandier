/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

module.exports = {
	flags: { PRESERVE_WEBPACK_CACHE: true },
	/**
	 * Adding plugins to this array adds them to your Gatsby site.
	 *
	 * Gatsby has a rich ecosystem of plugins.
	 * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
	 */
	plugins: [
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

		/**
		 * The following two plugins are required if you want to use Gatsby image
		 * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
		 * if you're curious about it.
		 */
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,

		{
			// See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Matthieu Teyssandier`,
				short_name: `MT©2021`,
				start_url: `/`,
				background_color: `#EAE9E8`,
				theme_color: `#000000`,
				display: `minimal-ui`,
				icon: `content/assets/gatsby-icon.png`,
				include_favicon: false,
			},
		},

		// See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
		`gatsby-plugin-react-helmet`,

		/**
		 * this (optional) plugin enables Progressive Web App + Offline functionality
		 * To learn more, visit: https://gatsby.dev/offline
		 */
		`gatsby-plugin-offline`,
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
