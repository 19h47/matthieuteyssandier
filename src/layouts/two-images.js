import React from 'react';
import Image from 'gatsby-image';

const TwoImages = ({ data }) => {
    const { item0, item1 } = data;

    return (
        <div className="Layout">
            <div className="Site-container">
                <div className="row d-flex">
                    <div className="col-10 col-md-4 offset-md-2 margin-top-auto">

                        {item0?.image?.localFile?.childImageSharp?.fluid && (<Image
                            fluid={item0.image.localFile.childImageSharp.fluid}
                            alt={item0.image.altText}
                            durationFadeIn={1800}
                        />)}
                        <p className="Layout__caption">{item0.caption}</p>

                    </div>
                    <div className="col-10 col-md-4 margin-top-auto">
                        {item1?.image?.localFile?.childImageSharp?.fluid && (<Image
                            fluid={item1.image.localFile.childImageSharp.fluid}
                            alt={item1.image.altText}
                            // style={{ height: '100%' }}
                            durationFadeIn={1800}
                        />)}
                        <p className="Layout__caption">{item1.caption}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoImages;
