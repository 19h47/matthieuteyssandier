import React from 'react';
import Image from 'gatsby-image';

const LargeImage = ({ data }) => {
    const { image, video, caption } = data;

    return (
        <div className="Layout Layout--large-image">
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-8 offset-md-2">
                        {image?.localFile?.childImageSharp?.fluid && (
                            <Image
                                fluid={image.localFile.childImageSharp.fluid}
                                alt={image.altText}
                                style={{ height: '100%' }}
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
                        {caption && (<p className="Layout__caption">{caption}</p>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LargeImage;
