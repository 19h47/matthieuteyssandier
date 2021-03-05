import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const LargeImage = ({ data }) => {
    const { video, caption } = data;
    const image = data.image?.localFile ? getImage(data.image.localFile) : false;

    return (
        <div className="Layout Layout--large-image">
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-8 offset-md-2">
                        {image && (
                            <GatsbyImage
                                image={image}
                                alt={image.altText}
                                style={{ height: '100%' }}
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
