import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

import CanvasCaseStudy from './canvas-case-study';

const StyledLink = styled(Link)`
	position: relative;
	display: block;
	height: 420px;
`;

const NextCaseStudy = ({ title, link, image, alt, color }) => (
    <StyledLink
        to={link}
        rel="next"
        aria-label={title}
        link={link}
        style={{ backgroundColor: color }}
        title={title}>
        <GatsbyImage image={image} alt={alt} style={{ height: '100%' }} />
        <CanvasCaseStudy color={color} />
    </StyledLink>
);

export default NextCaseStudy;
