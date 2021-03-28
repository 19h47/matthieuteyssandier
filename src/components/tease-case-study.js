import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { gsap } from 'gsap';
import useInView from 'react-cool-inview';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import TextInView from './text-in-view';
import ArrowRight from '../assets/arrow-right.inline.svg';
import CanvasCaseStudy from './canvas-case-study';

const Canvas = styled.canvas`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
`;

const TeaseCaseStudy = ({ caseStudy, index, length }) => {
    const image = getImage(caseStudy.featuredImage.node.localFile);
    const alt = caseStudy.featuredImage?.node?.alt || caseStudy.title;

    const context = useRef(null);
    const canvas = useRef(null);
    const canvasProps = useRef({
        width: 0,
        height: 0,
        radiusX: 0,
        radiusY: 0,
    });

    const tl = useRef(null);

    const { ref } = useInView({
        rootMargin: '-100px 0px',
        onEnter: ({ unobserve }) => {
            tl.current.play();
            unobserve();
        },
    });

    const drawRect = () => {

        const { offsetWidth, offsetHeight } = canvas.current;
        const { width, height } = canvasProps.current;

        context.current.clearRect(offsetWidth, 0, -offsetWidth, offsetHeight);
        context.current.fillStyle = caseStudy.customFields.color;
        context.current.beginPath();
        context.current.rect(width, 0, -width, height);
        context.current.fill();

    };

    const drawEllipse = () => {

        const { offsetWidth, offsetHeight } = canvas.current;
        const { width, height, radiusX, radiusY } = canvasProps.current;

        context.current.clearRect(offsetWidth, 0, -offsetWidth, offsetHeight);
        context.current.fillStyle = caseStudy.customFields.color;
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
        context.current.rect(offsetWidth, 0, -offsetWidth, offsetHeight);
        context.current.fill();

    };

    useLayoutEffect(() => {

        const $image = ref.current.querySelector('.js-image');
        const { offsetWidth: width, offsetHeight: height } = canvas.current;

        canvas.current.width = width;
        canvas.current.height = height;

        canvasProps.current.width = width;

        context.current = canvas.current.getContext('2d');

        tl.current = gsap.timeline({
            paused: true,
        });

        tl.current.set($image, { opacity: 0 });
        tl.current.set(ref.current, { pointerEvents: 'none' });

        tl.current.to(canvasProps.current, {
            duration: 1,
            ease: 'power4.inOut',
            height,
            onUpdate: drawRect,
        });

        tl.current.set($image, { opacity: 1 });

        tl.current.to(canvasProps.current, {
            duration: 1,
            ease: 'power4.inOut',
            radiusX: width / Math.sqrt(2),
            radiusY: height / Math.sqrt(2),
            onUpdate: drawEllipse,
        });

        tl.current.set(ref.current, { clearProps: 'all' });

    }, []);

    return (
        <div
            className="Tease-case-study"
            key={caseStudy.slug}
            ref={ref}
            style={{ pointerEvents: 'none' }}>
            <Link className="Tease-case-study__image" to={caseStudy.link}>
                <GatsbyImage
                    image={image}
                    className="js-image"
                    alt={alt}
                    style={{ opacity: '0' }}
                />
                <CanvasCaseStudy color={caseStudy.customFields.color} />
                <Canvas ref={canvas} />
            </Link>

            <Link to={caseStudy.link} style={{ display: 'block' }}>
                <h2 className="Tease-case-study__title h1">
                    <TextInView>
                        {index + 1}&nbsp;&mdash;&nbsp;{length} <br />
                    </TextInView>
                    <TextInView>{caseStudy.title}</TextInView>

                    <TextInView className="d-flex align-items-center justify-content-between">
                        {caseStudy.customFields.date}
                        <ArrowRight />
                    </TextInView>
                </h2>
            </Link>
        </div>
    );
};

export default TeaseCaseStudy;
