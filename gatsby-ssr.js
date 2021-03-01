import React from 'react';

import Provider from './src/provider';

export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>;
