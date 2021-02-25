import React from 'react';
import Image from 'gatsby-image';

const ImageFull = ({ data }) => {
    const { image, video, caption } = data;

    return (
        <div className="Layout Layout--image-full">
            {image && (
                <Image
                    fluid={image.localFile.childImageSharp.fluid}
                    alt={image.altText}
                    style={{ height: '100%' }}
                    durationFadeIn={1800}
                />
            )}
            {video && <video autoPlay loop muted playsInline src={video.localFile.url}></video>}

            {caption && (
                <div className="Site-container">
                    <div className="row">
                        <div className="col-10">
                            <p className="Layout__caption">{caption}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageFull;
