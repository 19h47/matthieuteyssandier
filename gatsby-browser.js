// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"
// normalize CSS across browsers
// import "./src/normalize.css"
// custom CSS styles
import './src/stylesheets/styles.scss';

import React from 'react';

import { Wrap } from './src/components/wrap';

export const wrapRootElement = ({ element }) => <Wrap>{element}</Wrap>;
