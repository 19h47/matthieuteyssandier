import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const LayoutImage = ({ data }) => {
    const { caption } = data;
    const image = getImage(data.image.localFile);

    return (
        <div className="Layout Layout--image">
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-4 offset-md-6">
                        {image && (
                            <GatsbyImage
                                image={image}
                                alt={image.altText}
                            />
                        )}
                        {caption && <p className="Layout__caption">{caption}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutImage;
