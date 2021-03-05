import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { gsap } from 'gsap';

const StyledLink = styled(Link)`
	position: relative;
	display: block;
	height: 420px;
`;

const Canvas = styled.canvas`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const NextCaseStudy = ({ title, link, image, alt, color }) => {
    const context = useRef(null);
    const canvas = useRef(null);
    const ellipseProps = useRef({ radiusX: 0, radiusY: 0 });
    const tl = useRef(null);

    const handleMouseEnter = () => tl.current.play();
    const handleMouseLeave = () => tl.current.reverse(0);

    const draw = () => {
        if (canvas.current) {
            const { offsetWidth: width, offsetHeight: height } = canvas.current;

            canvas.current.width = width;
            canvas.current.height = height;

            context.current = canvas.current.getContext('2d');

            context.current.clearRect(0, 0, width, height);
            context.current.fillStyle = color;
            context.current.beginPath();
            context.current.ellipse(
                width / 2,
                height / 2,
                ellipseProps.current.radiusX,
                ellipseProps.current.radiusY,
                Math.PI,
                0,
                2 * Math.PI,
            );

            context.current.rect(width, 0, -width, height);
            context.current.fill();
        }
    };

    useLayoutEffect(() => {
        if (canvas.current) {
            const { offsetWidth: width, offsetHeight: height } = canvas.current;

            ellipseProps.current = {
                radiusX: width / Math.sqrt(2),
                radiusY: height / Math.sqrt(2),
            };

            tl.current = gsap.timeline({
                paused: true,
                onUpdate: draw,
            });

            tl.current.to(ellipseProps.current, {
                duration: 1.8,
                ease: 'power4.out',
                radiusX: width / 2,
                radiusY: height / 2,
            });

            draw();
        }
    });

    return (
        <StyledLink
            to={link}
            rel="next"
            aria-label={title}
            link={link}
            style={{ backgroundColor: color }}
            title={title}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <GatsbyImage image={image} alt={alt} style={{ height: '100%' }} />
            <Canvas ref={canvas} />
        </StyledLink>
    );
};

export default NextCaseStudy;
