import React, { useEffect, useRef } from 'react';
import useInView from 'react-cool-inview';
import { Link } from 'gatsby';
import { gsap } from 'gsap';

import ArrowRight from '../assets/arrow-right.inline.svg';

const TeaseCaseStudy = ({ caseStudy, index, length }) => {
    const featuredImage = {
        fluid: caseStudy.featuredImage?.node?.localFile?.childImageSharp?.fluid,
        alt: caseStudy.featuredImage?.node?.alt || ``,
    };

    const mask = useRef();
    const circle = useRef();
    const image = useRef();
    const tl = useRef();

    const { ref, inView } = useInView({
        unobserveOnEnter: true,
        trackVisibility: true,
        delay: 100,
    });

    useEffect(() => {
        gsap.set(image.current, { opacity: 0 });

        tl.current = gsap.timeline({
            paused: true,
        });

        tl.current.set(ref.current, { pointerEvents: 'none' });

        tl.current.fromTo(
            mask.current,
            { transformOrigin: '50% 50%', yPercent: 100, smoothOrigin: true },
            { yPercent: 0, duration: 1, ease: 'power4.inOut' },
        );
        tl.current.set(image.current, { opacity: 1 });
        tl.current.fromTo(
            circle.current,
            { transformOrigin: '50% 50%', scale: 0, smoothOrigin: true },
            { scale: 1, duration: 1, ease: 'power4.inOut' },
        );
        tl.current.set(ref.current, { clearProps: 'all' });

        tl.current.reverse();

        if (inView) {
            tl.current.play();
        } else {
            tl.current.reverse(0);
        }
    }, [inView, ref]);

    return (
        <div className="Tease-case-study" key={caseStudy.slug} ref={ref}>
            {featuredImage?.fluid && (
                <Link
                    className="Tease-case-study__image"
                    to={caseStudy.link}
                >
                    <img
                        ref={image}
                        src={featuredImage.fluid.srcWebp}
                        srcSet={featuredImage.fluid.srcSetWebp}
                        sizes={featuredImage.fluid.sizes}
                        alt={featuredImage.alt}
                        loading="lazy"
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
                        className="Tease-case-study__mask"
                        viewBox="0 0 600 600"
                        ref={mask}
                        preserveAspectRatio="none">
                        <mask id={`mask-${index}`}>
                            <rect width="600" height="600" fill="white" />
                            <circle ref={circle} cx="300" cy="300" r="424.3" />
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
