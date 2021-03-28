import React, { useContext, useEffect, useRef } from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { gsap } from 'gsap';

import { AppContext } from '../../provider';
import { Container, Images, Column, Footer } from './style';

const MenuItem = ({ caseStudy }) => {
    const { color, setColor, setMenu } = useContext(AppContext);
    const image = getImage(caseStudy.featuredImage.node.localFile);
    const alt = caseStudy.featuredImage?.node?.alt || caseStudy.title;
    const containerRef = useRef();
    const title = useRef();
    const columns = useRef([]);
    const tl = useRef(
        gsap.timeline({
            paused: true,
        }),
    );

    useEffect(() => {
        // console.log('MenuItem');
        tl.current.fromTo(
            [
                containerRef.current.querySelector('.js-title'),
                containerRef.current.querySelectorAll('.js-image'),
                columns.current.querySelectorAll('p'),
            ],
            { clipPath: 'inset(0 0 100% 0)' },
            {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.5,
                ease: 'power4.inOut',
                stagger: 0.1,
            },
        );
    }, []);

    useEffect(() => {
        if (color && color === caseStudy.customFields.color) {
            gsap.delayedCall(1, () => tl.current.play());
        }

        if (color && color !== caseStudy.customFields.color) {
            tl.current.reverse();
        }

        if (null === color) {
            tl.current.timeScale(2.5).reverse();
        }
    }, [color]);

    const createImages = () => {
        console.log('createImages');
        const images = [];

        for (let i = 0; i < 5; i++) {
            images.push(
                <GatsbyImage
                    key={i}
                    image={image}
                    alt={alt}
                    objectFit="cover"
                    objectPosition="center"
                    layout="fixed"
                    style={{
                        width: '453px',
                        height: '246px',
                        margin: '0 10px',
                        flex: '0 0 453px',
                    }}
                    imgStyle={{
                        width: '453px',
                        minWidth: '453px',
                        height: '246px',
                    }}
                    className="js-image"
                />,
            );
        }

        return images;
    };

    return (
        <Container ref={containerRef}>
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 d-flex justify-content-center">
                        <AniLink
                            className="h0 js-title"
                            style={{
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                height: '280px',
                                marginTop: '0',
                                marginBottom: '-50px',
                                position: 'relative',
                                zIndex: '1'
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
                    <Images className="col-10 d-flex justify-content-center flex-nowrap">
                        {createImages()}
                    </Images>
                </div>
            </div>
            <Footer ref={columns}>
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
            </Footer>
        </Container>
    );
};

export default MenuItem;
