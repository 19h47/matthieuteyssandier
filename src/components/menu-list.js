import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../provider';
import styled from 'styled-components';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';

const Container = styled.li`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
`;

const H1 = styled.div`
	text-transform: uppercase;
	text-align: center;
`;

const MenuList = ({ caseStudy }) => {
    const { color } = useContext(AppContext);
    const image = getImage(caseStudy.featuredImage.node.localFile);
    const alt = caseStudy.featuredImage?.node?.alt || caseStudy.title;
    const container = useRef();

    useEffect(() => {
        if (color) {
            console.log(container)
        }
    }, [color])

    const createImages = () => {
        const images = [];

        for (let i = 0; i < 5; i++) {
            images.push(<GatsbyImage
                key={i}
                image={image}
                className="js-image"
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
                    mixBlendMode: 'multiply',
                    filter: 'grayscale(100%)',
                }}
            />)
        }

        return images
    }

    return (
        <Container style={{ opacity: caseStudy.customFields.color === color ? '1' : '0' }}>
            <div className="row">
                <div className="col-10 col-md-6 offset-md-2">
                    <H1 className="h1">{caseStudy.title}</H1>
                </div>
                <div className="col-10 d-flex justify-content-center flex-nowrap" ref={container}>
                    {createImages()}
                </div>
            </div>
        </Container>
    );
};

export default MenuList;
