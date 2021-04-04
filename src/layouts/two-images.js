import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import useInView from 'react-cool-inview';
import styled from 'styled-components';

import TextInView from '../components/text-in-view';

const Content = styled.div`
	position: relative;

	&::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: block;
		background-color: ${props => props.$color};
		content: '';
		opacity: ${props => (props.$inview ? '0' : '1')};
		transition: opacity 1.5s cubic-bezier(0.42, 0, 0.58, 1);
		will-change: opacity;
	}
`;

const TwoImages = ({ data }) => {
    const { item0, item1 } = data;
    const image0 = item0.image?.localFile ? getImage(item0.image.localFile) : false;
    const image1 = item1.image?.localFile ? getImage(item1.image.localFile) : false;

    const { observe, inView } = useInView({
        unobserveOnEnter: true,
        rootMargin: "-100px 0px",
    });

    return (
        <div className="Layout Layout--two-images" ref={observe}>
            <div className="Site-container">
                <div className="row d-flex">
                    <div className="col-10 col-md-4 offset-md-2 margin-top-auto">
                        {image0 && (
                            <Content $color={image0.backgroundColor} $inview={inView}>
                                <GatsbyImage
                                    image={image0}
                                    alt={item0.image.altText}
                                    style={{ verticalAlign: 'middle' }}
                                />
                            </Content>
                        )}
                        {item0.caption && (
                            <TextInView>
                                <p className="Layout__caption">{item0.caption}</p>
                            </TextInView>
                        )}
                    </div>
                    <div className="col-10 col-md-4 margin-top-auto">
                        {image1 && (
                            <Content $color={image1.backgroundColor} $inview={inView}>
                                <GatsbyImage
                                    image={image1}
                                    alt={item1.image.altText}
                                    style={{ verticalAlign: 'middle' }}
                                />
                            </Content>
                        )}
                        {item1.caption && (
                            <TextInView>
                                <p className="Layout__caption">{item1.caption}</p>
                            </TextInView>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoImages;
