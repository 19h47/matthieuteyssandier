import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import ArrowRight from '../assets/arrow-right.inline.svg';

const TeaseCaseStudy = ({ caseStudy, index, length }) => {
    const featuredImage = {
        fluid: caseStudy.featuredImage?.node?.localFile?.childImageSharp?.fluid,
        alt: caseStudy.featuredImage?.node?.alt || ``,
    };

    return (
        <div
            className="Tease-case-study"
            key={caseStudy.slug}
        >
            {featuredImage?.fluid && (
                <Link className="Tease-case-study__image" to={caseStudy.link}>
                    <Image
                        fluid={featuredImage.fluid}
                        alt={featuredImage.alt}
                        backgroundColor={caseStudy.customFields.color}
                        durationFadeIn={1800}
                    />
                    <svg viewBox="0 0 600 600" preserveAspectRatio="none">
                        <g>
                            <path fill={caseStudy.customFields.color} d="M-50-50v700h700V-50H-50z M300,600C134.3,600,0,465.7,0,300S134.3,0,300,0s300,134.3,300,300S465.7,600,300,600z" />
                        </g>
                    </svg>
                </Link>
            )
            }
            <Link to={caseStudy.link}>
                <h2 className="Tease-case-study__title h1">
                    {index + 1}&nbsp;&mdash;&nbsp;{length} <br />
                    {caseStudy.title}
                    <div className="d-flex align-items-center justify-content-between">
                        {caseStudy.customFields.date}
                        <ArrowRight />
                    </div>
                </h2>
            </Link>
        </div >
    );
};

export default TeaseCaseStudy;
