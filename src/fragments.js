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
	fragment TeaseCaseStudyImage on WpMediaItem {
		altText
		localFile {
			childImageSharp {
				gatsbyImageData(layout: CONSTRAINED, height: 688)
			}
		}
	}
`;
