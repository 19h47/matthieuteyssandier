import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Header from '../components/header';

const Index = ({ children }) => {
    // const {
    //     wp: {
    //         caseStudiesColors: { color },
    //     },
    // } = useStaticQuery(graphql`
    // 	query color {
    // 		wp {
    // 			caseStudiesColors {
    // 				color
    // 			}
    // 		}
    // 	}
    // `);

    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Index;
