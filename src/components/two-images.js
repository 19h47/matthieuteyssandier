import React from 'react';
import Image from 'gatsby-image';

const TwoImages = ({ data }) => {
    const { item0, item1 } = data;

    console.log(item0);

    return (
        <div className="row">
            <div className="col-4">
                {item0?.image?.localFile?.childImageSharp?.fluid && (<Image
                    fluid={item0.image.localFile.childImageSharp.fluid}
                    alt={item0.image.altText}
                    style={{ height: '100%' }}
                    durationFadeIn={1800}
                />)}
            </div>
            <div className="col-4">
                {item1?.image?.localFile?.childImageSharp?.fluid && (<Image
                    fluid={item1.image.localFile.childImageSharp.fluid}
                    alt={item1.image.altText}
                    style={{ height: '100%' }}
                    durationFadeIn={1800}
                />)}
            </div>
        </div>
    );
};

export default TwoImages;
