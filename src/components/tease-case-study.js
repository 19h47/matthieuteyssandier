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
        <div className="Tease-case-study" key={caseStudy.slug}>
            {featuredImage?.fluid && (
                <Link className="d-block" to={caseStudy.link}>
                    <Image
                        fluid={featuredImage.fluid}
                        alt={featuredImage.alt}
                        backgroundColor={caseStudy.customFields.color}
                    />
                </Link>
            )}
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
        </div>
    );
};

export default TeaseCaseStudy;
