import React from 'react';
import Image from 'gatsby-image';

const LayoutText = ({ data }) => {
    const { image, video, caption, content } = data;

    return (
        <div className="Layout Layout--image-text">
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-4 offset-md-2">
                        {image?.localFile?.childImageSharp?.fluid && (
                            <Image
                                fluid={image.localFile.childImageSharp.fluid}
                                alt={image.altText}
                                durationFadeIn={1800}
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
