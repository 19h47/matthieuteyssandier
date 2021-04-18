import React, { useContext, useEffect, useRef, useMemo } from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { gsap } from 'gsap';
import styled from 'styled-components';

import { AppContext } from '../../provider';
import { Container } from './style';

const StyledAniLink = styled(props => <AniLink {...props} />)`
	will-change: border-radius;
	transition: border-radius 1.5s var(--ease-out-expo);

	&:hover {
		border-radius: 50%;
	}
`;

const MenuItem = ({ caseStudy }) => {
    const { color, setColor, setMenu } = useContext(AppContext);
    const image = getImage(caseStudy.featuredImage.node.localFile);
    const alt = caseStudy.featuredImage?.node?.alt || caseStudy.title;
    const containerRef = useRef();

    const timeline = useMemo(
        () =>
            gsap.timeline({
                delay: 1,
                paused: true,
                onStart: () => {
                    containerRef.current.style.setProperty(
                        'pointer-events',
                        timeline.reversed() ? 'none' : 'auto',
                    );
                },
            }),
        [],
    );

    useEffect(() => {
        timeline.fromTo(
            [
                containerRef.current.querySelector('.js-title'),
                containerRef.current.querySelectorAll('.js-image'),
            ],
            { clipPath: 'inset(0 0 100% 0)' },
            {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.5,
                ease: 'power4.inOut',
                stagger: 0.1,
            },
        );
    }, [timeline]);

    useEffect(() => {
        if (color && color === caseStudy.customFields.color) {
            timeline.play();
        }

        if (color && color !== caseStudy.customFields.color) {
            timeline.reverse();
        }

        if (null === color) {
            timeline.timeScale(2.5).reverse();
        }
    }, [color, caseStudy.customFields.color, timeline]);

    // const createImages = () => {
    //     console.log('🏙 createImages');
    //     const images = [];

    //     for (let i = 0; i < 3; i++) {
    //         images.push(
    //             <StyledAniLink
    //                 key={i}
    //                 to={caseStudy.link}
    //                 style={{
    //                     mixBlendMode: 'multiply',
    //                     filter: 'grayscale(100%)',
    //                     maxWidth: `${(6 / 12) * 100}%`,
    //                     flex: `0 0 ${(6 / 12) * 100}%`,
    //                     margin: '0 10px',
    //                     overflow: 'hidden',
    //                 }}>
    //                 <GatsbyImage
    //                     image={image}
    //                     alt={alt}
    //                     objectFit="cover"
    //                     objectPosition="center"
    //                     layout="fixed"
    //                     style={{
    //                         width: '100%',
    //                         height: '100%',
    //                     }}
    //                     imgStyle={{
    //                         width: '100%',
    //                         height: '100%',
    //                     }}
    //                     className="js-image"
    //                 />
    //             </StyledAniLink>,
    //         );
    //     }

    //     return images;
    // };

    return (
        <Container ref={containerRef} style={{ pointerEvents: 'none' }}>
            <div className="Site-container h-100">
                <div className="row h-100">
                    <div className="col-10 d-flex justify-content-center align-items-center">
                        <AniLink
                            className="h0 js-title"
                            style={{
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                marginTop: '0',
                                position: 'relative',
                                zIndex: '1',

                            }}
                            fade
                            to={caseStudy.link}
                            onClick={() => {
                                setMenu(false);
                                setColor(null);
                            }}>
                            {caseStudy.title}
                        </AniLink>
                    </div>
                    <div className="col-10 d-flex justify-content-center flex-nowrap" style={{ marginTop: `${(-80 / 1080) * 100}vh` }}>
                        <StyledAniLink
                            key="0"
                            to={caseStudy.link}
                            style={{
                                mixBlendMode: 'multiply',
                                filter: 'grayscale(100%)',
                                maxWidth: `${(6 / 12) * 100}%`,
                                flex: `0 0 ${(6 / 12) * 100}%`,
                                margin: '0 10px',
                                overflow: 'hidden',
                            }}>
                            <GatsbyImage
                                image={image}
                                alt={alt}
                                objectFit="cover"
                                objectPosition="center"
                                layout="fixed"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                imgStyle={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                className="js-image"
                            />
                        </StyledAniLink>
                        <StyledAniLink
                            key="1"
                            to={caseStudy.link}
                            style={{
                                mixBlendMode: 'multiply',
                                filter: 'grayscale(100%)',
                                maxWidth: `${(6 / 12) * 100}%`,
                                flex: `0 0 ${(6 / 12) * 100}%`,
                                margin: '0 10px',
                                overflow: 'hidden',
                            }}>
                            <GatsbyImage
                                image={image}
                                alt={alt}
                                objectFit="cover"
                                objectPosition="center"
                                layout="fixed"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                imgStyle={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                className="js-image"
                            />
                        </StyledAniLink>
                        <StyledAniLink
                            key="2"
                            to={caseStudy.link}
                            style={{
                                mixBlendMode: 'multiply',
                                filter: 'grayscale(100%)',
                                maxWidth: `${(6 / 12) * 100}%`,
                                flex: `0 0 ${(6 / 12) * 100}%`,
                                margin: '0 10px',
                                overflow: 'hidden',
                            }}>
                            <GatsbyImage
                                image={image}
                                alt={alt}
                                objectFit="cover"
                                objectPosition="center"
                                layout="fixed"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                imgStyle={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                className="js-image"
                            />
                        </StyledAniLink>
                    </div>
                </div>
            </div>
            {/* <Footer ref={columns}>
                <div className="Site-container">
                    <div className="row">
                        <Column className="col-3 offset-7">
                            <p>{caseStudy.categories?.nodes[0]?.name}</p>
                            <p>{caseStudy.categories?.nodes[0]?.name}</p>
                            <p>{caseStudy.categories?.nodes[0]?.name}</p>
                        </Column>
                    </div>
                    <div className="row">
                        <Column className="col-5">
                            <p>{caseStudy.customFields.date}</p>
                            <p>{caseStudy.customFields.date}</p>
                            <p>{caseStudy.customFields.date}</p>
                        </Column>
                        <Column className="col-5">
                            <p>{caseStudy.categories?.nodes[1]?.name}</p>
                            <p>{caseStudy.categories?.nodes[1]?.name}</p>
                            <p>{caseStudy.categories?.nodes[1]?.name}</p>
                        </Column>
                    </div>
                </div>
            </Footer> */}
        </Container>
    );
};

export default MenuItem;
