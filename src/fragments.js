import { graphql } from 'gatsby';

export const fragments = graphql`
	fragment FeaturedImage on WpMediaItem {
		altText
		localFile {
			childImageSharp {
				gatsbyImageData(layout: CONSTRAINED)
			}
		}
	}
`;
