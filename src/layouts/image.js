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
		background-color: ${props => props.color};
		content: '';
		opacity: ${props => (props.inview ? '0' : '1')};
		transition: opacity 1.5s cubic-bezier(0.42, 0, 0.58, 1);
		will-change: opacity;
	}
`;

const LayoutImage = ({ data }) => {
    const { caption } = data;
    const image = getImage(data.image.localFile);

    const { ref, inView } = useInView({
        onEnter: ({ unobserve }) => {
            unobserve();
        },
    });

    return (
        <div className="Layout Layout--image" ref={ref}>
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-4 offset-md-6">
                        {image && (
                            <Content color={image.backgroundColor} inview={inView}>
                                <GatsbyImage
                                    style={{ verticalAlign: 'middle' }}
                                    image={image}
                                    alt={image.altText || ''}
                                />
                            </Content>
                        )}
                        {caption && (
                            <TextInView>
                                <p className="Layout__caption">{caption}</p>
                            </TextInView>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutImage;
