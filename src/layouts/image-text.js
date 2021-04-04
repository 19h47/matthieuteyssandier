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

const LayoutText = ({ data }) => {
    const { video, caption, content } = data;
    const image = getImage(data.image.localFile);

    const { observe, inView } = useInView({
        unobserveOnEnter: true,
        rootMargin: "-100px 0px",
    });

    return (
        <div className="Layout Layout--image-text" ref={observe}>
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-4 offset-md-2">
                        <Content $color={image.backgroundColor} $inview={inView}>
                            {image && (
                                <GatsbyImage
                                    style={{ verticalAlign: 'middle' }}
                                    image={image}
                                    alt={image.altText || ''}
                                />
                            )}
                            {video && (
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    src={video.localFile.url}></video>
                            )}
                        </Content>
                        {caption && <TextInView><p className="Layout__caption">{caption}</p></TextInView>}
                    </div>
                    <div className="col-10 col-md-4">
                        {content?.french && (
                            <div
                                className="Layout__content"
                                dangerouslySetInnerHTML={{
                                    __html: content.french,
                                }}
                            />
                        )}
                        {content?.english && (
                            <div
                                className="Layout__content color-yellow-dark-grayish"
                                dangerouslySetInnerHTML={{
                                    __html: content.english,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutText;
