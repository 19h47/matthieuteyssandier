import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Canvas = styled.canvas`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
`;

const CanvasCaseStudy = ({ color }) => {
    const context = useRef(null);
    const canvas = useRef(null);
    const canvasProps = useRef({
        radiusX: 0,
        radiusY: 0,
        width: 0,
        height: 0,
    });

    const tl = useRef(null);

    const draw = () => {
        if (canvas.current) {
            const { width, height, radiusX, radiusY } = canvasProps.current;

            context.current.clearRect(width, 0, -width, height);
            context.current.fillStyle = color;
            context.current.beginPath();
            context.current.ellipse(
                width / 2,
                height / 2,
                radiusX,
                radiusY,
                Math.PI,
                0,
                2 * Math.PI,
            );

            context.current.rect(width, 0, -width, height);
            context.current.fill();
        }
    };

    const handleMouseEnter = () => {
        tl.current.timeScale(1);
        tl.current.play();
    };
    const handleMouseLeave = () => {
        tl.current.timeScale(1.5);
        tl.current.reverse();
    };

    useLayoutEffect(() => {
        if (canvas.current) {
            const { offsetWidth: width, offsetHeight: height } = canvas.current;

            canvas.current.width = width;
            canvas.current.height = height;

            canvasProps.current.radiusX = width / Math.sqrt(2);
            canvasProps.current.radiusY = height / Math.sqrt(2);
            canvasProps.current.width = width;
            canvasProps.current.height = height;

            context.current = canvas.current.getContext('2d');

            tl.current = gsap.timeline({
                paused: true,
                onUpdate: draw,
            });

            tl.current.to(canvasProps.current, {
                duration: 1.5,
                ease: 'power4.inOut',
                radiusX: width / 2,
                radiusY: height / 2,
            });
        }
    });

    return <Canvas ref={canvas} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
};

CanvasCaseStudy.defaultProps = {
    color: '#ffffff',
};

CanvasCaseStudy.propTypes = {
    color: PropTypes.string.isRequired,
};

export default CanvasCaseStudy;
