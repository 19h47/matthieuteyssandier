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
				gatsbyImageData(layout: CONSTRAINED, height: 688, placeholder: DOMINANT_COLOR)
			}
		}
	}
	fragment TeaseCaseStudyImageMenu on WpMediaItem {
		altText
		localFile {
			childImageSharp {
				gatsbyImageData(layout: FIXED, height: 246, placeholder: DOMINANT_COLOR)
			}
		}
	}
`;
