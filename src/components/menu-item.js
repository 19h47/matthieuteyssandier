import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../provider';
import styled from 'styled-components';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { gsap } from 'gsap';

const Container = styled.li`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
`;

const Images = styled.div`
	mix-blend-mode: multiply;
	filter: grayscale(100%);
`;

const H0 = styled.div`
	text-transform: uppercase;
	text-align: center;
	height: 280px;
	margin-top: 0;
	margin-bottom: -50px;
`;

const Column = styled.div`
	font-size: 35px;
	line-height: 100%;

	p {
		margin: 0;
	}
`;

const Footer = styled.footer`
    margin-top: 50px;
`

const MenuItem = ({ caseStudy }) => {
    const { color } = useContext(AppContext);
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
        console.log('MenuItem');
        tl.current.fromTo(
            [container.current, title.current, columns.current.querySelectorAll('p')],
            { clipPath: 'inset(0 0 100% 0)' },
            {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.5,
                ease: 'power4.inOut',
            },
        );
    }, []);

    useEffect(() => {
        if (color && color === caseStudy.customFields.color) {
            tl.current.play();
        }

        if (color && color !== caseStudy.customFields.color) {
            tl.current.reverse();
        }

        if (null === color) {
            tl.current.timeScale(2).reverse();
        }
    }, [color, caseStudy.customFields.color]);

    const createImages = () => {
        console.log('createImages')
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

    return (
        <Container>
            <div className="row">
                <div className="col-10">
                    <H0 ref={title} className="h0">
                        {caseStudy.title}
                    </H0>
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
        </Container >
    );
};

export default MenuItem;
