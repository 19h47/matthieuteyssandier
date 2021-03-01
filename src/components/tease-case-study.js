import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { gsap } from 'gsap';
import useInView from 'react-cool-inview';

import ArrowRight from '../assets/arrow-right.inline.svg';

const TeaseCaseStudy = ({ caseStudy, index, length }) => {
    const featuredImage = {
        fluid: caseStudy.featuredImage?.node?.localFile?.childImageSharp?.fluid,
        alt: caseStudy.featuredImage?.node?.alt || ``,
        width: caseStudy.featuredImage?.node?.localFile?.childImageSharp?.fixed.width,
        height: caseStudy.featuredImage?.node?.localFile?.childImageSharp?.fixed.height,
    };

    const tl = useRef();

    const { ref } = useInView({
        rootMargin: '-100px 0px',
        onEnter: ({ unobserve }) => {
            tl.current.play();
            unobserve();
        },
    });

    useEffect(() => {
        const $image = ref.current.querySelector('.js-image');
        const $mask = ref.current.querySelector('.js-mask');
        const $circle = ref.current.querySelector('.js-circle');

        tl.current = gsap.timeline({
            paused: true,
        });

        tl.current.set($image, { opacity: 0 });
        tl.current.set(ref.current, { pointerEvents: 'none' });

        tl.current.fromTo(
            $mask,
            { transformOrigin: '50% 50%', yPercent: 100, smoothOrigin: true },
            { yPercent: 0, duration: 1, ease: 'power4.inOut' },
        );
        tl.current.set($image, { opacity: 1 });
        tl.current.fromTo(
            $circle,
            { transformOrigin: '50% 50%', scale: 0, smoothOrigin: true },
            { scale: 1, duration: 1, ease: 'power4.inOut' },
        );
        tl.current.set(ref.current, { clearProps: 'all' });
    }, [tl, ref]);

    return (
        <div
            className="Tease-case-study"
            key={caseStudy.slug}
            ref={ref}
            style={{ pointerEvents: 'none' }}>
            {featuredImage?.fluid && (
                <Link className="Tease-case-study__image" to={caseStudy.link}>
                    <img
                        style={{ opacity: 0 }}
                        src={featuredImage.fluid.srcWebp}
                        srcSet={featuredImage.fluid.srcSetWebp}
                        sizes={featuredImage.fluid.sizes}
                        alt={featuredImage.alt}
                        width={featuredImage.width}
                        height={featuredImage.height}
                        loading="lazy"
                        className="js-image"
                    />

                    <svg
                        className="Tease-case-study__hover"
                        viewBox="0 0 600 600"
                        preserveAspectRatio="none">
                        <g>
                            <path
                                fill={caseStudy.customFields.color}
                                d="M-50-50v700h700V-50H-50z M300,600C134.3,600,0,465.7,0,300S134.3,0,300,0s300,134.3,300,300S465.7,600,300,600z"
                            />
                        </g>
                    </svg>

                    <svg
                        style={{ transformOrigin: '50% 50%', scale: '0' }}
                        className="Tease-case-study__mask js-mask"
                        viewBox="0 0 600 600"
                        preserveAspectRatio="none">
                        <mask id={`mask-${index}`}>
                            <rect width="600" height="600" fill="white" />
                            <circle className="js-circle" cx="300" cy="300" r="424.3" />
                        </mask>

                        <rect
                            mask={`url(#mask-${index})`}
                            fill={caseStudy.customFields.color}
                            width="600"
                            height="600"
                        />
                    </svg>
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
