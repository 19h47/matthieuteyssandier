import React from 'react';

import { AppProvider } from './src/provider';

export const wrapRootElement = ({ element }) => <AppProvider>{element}</AppProvider>;
