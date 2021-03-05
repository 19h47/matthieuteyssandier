import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const LayoutText = ({ data }) => {
    const { video, caption, content } = data;
    const image = getImage(data.image.localFile);

    return (
        <div className="Layout Layout--image-text">
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-4 offset-md-2">
                        {image && (
                            <GatsbyImage
                                image={image}
                                alt={image.altText}
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
                        {caption && <p className="Layout__caption">{caption}</p>}
                    </div>
                    <div className="col-10 col-md-4">
                        {content?.french && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.french,
                                }}
                            />
                        )}
                        {content?.english && (
                            <div
                                className="color-yellow-dark-grayish"
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
