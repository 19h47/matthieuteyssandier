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

const LargeImage = ({ data }) => {
    const { video, caption } = data;
    const image = data.image?.localFile ? getImage(data.image.localFile) : false;

    const { ref, inView } = useInView({
        onEnter: ({ unobserve }) => {
            unobserve();
        },
    });

    return (
        <div className="Layout Layout--large-image" ref={ref}>
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-8 offset-md-2">
                        <Content color={image.backgroundColor} inview={inView}>
                            {image && (
                                <GatsbyImage
                                    image={image}
                                    alt={image.altText || ''}
                                    style={{ height: '100%', verticalAlign: 'middle' }}
                                />
                            )}
                            {video && (
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    src={video.localFile.url}
                                    style={{ verticalAlign: 'middle' }}
                                />
                            )}
                        </Content>
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

export default LargeImage;
