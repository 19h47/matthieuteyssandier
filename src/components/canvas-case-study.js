import React, { useRef, useEffect, useCallback, useMemo } from 'react';
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

    const draw = useCallback(() => {
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
    }, [color]);

    const timeline = useMemo(() => gsap.timeline({ paused: true, onUpdate: draw }), [draw]);

    const handleMouseEnter = () => {
        timeline.timeScale(1);
        timeline.play();
    };
    const handleMouseLeave = () => {
        timeline.timeScale(1.5);
        timeline.reverse();
    };

    useEffect(() => {
        const { offsetWidth: width, offsetHeight: height } = canvas.current;

        canvas.current.width = width;
        canvas.current.height = height;

        canvasProps.current.radiusX = width / Math.sqrt(2);
        canvasProps.current.radiusY = height / Math.sqrt(2);
        canvasProps.current.width = width;
        canvasProps.current.height = height;

        context.current = canvas.current.getContext('2d');

        timeline.to(canvasProps.current, {
            duration: 1.5,
            ease: 'power4.inOut',
            radiusX: width / 2,
            radiusY: height / 2,
        });
    }, [timeline]);

    return <Canvas ref={canvas} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
};

CanvasCaseStudy.defaultProps = {
    color: '#ffffff',
};

CanvasCaseStudy.propTypes = {
    color: PropTypes.string.isRequired,
};

export default CanvasCaseStudy;
