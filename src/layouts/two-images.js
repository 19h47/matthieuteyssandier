import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const TwoImages = ({ data }) => {
    const { item0, item1 } = data;
    const image0 = getImage(item0.image.localFile);
    const image1 = getImage(item1.image.localFile);

    return (
        <div className="Layout">
            <div className="Site-container">
                <div className="row d-flex">
                    <div className="col-10 col-md-4 offset-md-2 margin-top-auto">
                        {image0 && (<GatsbyImage image={image0} alt={item0.image.altText} />)}
                        <p className="Layout__caption">{item0.caption}</p>
                    </div>
                    <div className="col-10 col-md-4 margin-top-auto">
                        {image1 && (<GatsbyImage image={image1} alt={item1.image.altText} />)}
                        <p className="Layout__caption">{item1.caption}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoImages;
