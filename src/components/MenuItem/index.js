import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { gsap } from 'gsap';

import { AppContext } from '../../provider';
import { Container, Images, Column, Footer } from './style';

const MenuItem = ({ caseStudy }) => {
    const { color, setColor, setMenu } = useContext(AppContext);
    const image = getImage(caseStudy.featuredImage.node.localFile);
    const alt = caseStudy.featuredImage?.node?.alt || caseStudy.title;
    const container = useRef();
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
                title.current,
                container.current.querySelectorAll('.gatsby-image-wrapper'),
                columns.current.querySelectorAll('p'),
            ],
            { clipPath: 'inset(0 0 100% 0)' },
            {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.5,
                ease: 'power4.inOut',
                stagger: 0.05,
            },
        );
    }, []);

    useEffect(() => {
        if (color && color === caseStudy.customFields.color) {
            tl.current.delay(2).play();
        }

        if (color && color !== caseStudy.customFields.color) {
            tl.current.reverse();
        }

        if (null === color) {
            tl.current.timeScale(2).reverse();
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
                />,
            );
        }

        return images;
    };

    const handleClick = () => {
        setMenu(false);
        setColor(null);
    }

    return (
        <Container>
            <div className="row">
                <div className="col-10">
                    <Link
                        className="h0"
                        style={{
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            height: '280px',
                            marginTop: '0',
                            marginBottom: '-50px',
                        }}
                        ref={title}
                        to={caseStudy.link}
                        onClick={handleClick}>
                        {caseStudy.title}
                    </Link>
                </div>
                <Images
                    className="col-10 d-flex justify-content-center flex-nowrap"
                    ref={container}>
                    {createImages()}
                </Images>
            </div>
            <Footer ref={columns}>
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
            </Footer>
        </Container>
    );
};

export default MenuItem;
