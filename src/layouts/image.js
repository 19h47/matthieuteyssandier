import React from 'react';
import Image from 'gatsby-image';

const LayoutImage = ({ data }) => {
    const { image, caption } = data;

    console.log(data);

    return (
        <div className="Layout Layout--image">
            <div className="Site-container">
                <div className="row">
                    <div className="col-10 col-md-4 offset-md-6">
                        {image?.localFile?.childImageSharp?.fluid && (
                            <Image
                                fluid={image.localFile.childImageSharp.fluid}
                                alt={image.altText}
                                durationFadeIn={1800}
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
