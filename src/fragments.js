import { graphql } from 'gatsby';

export const fragments = graphql`
	fragment FeaturedImage on WpMediaItem {
		altText
		localFile {
			childImageSharp {
				fluid(maxWidth: 1420, quality: 100) {
					...GatsbyImageSharpFluid_withWebp
				}
				fixed {
					height
					width
				}
			}
		}
	}
`;
