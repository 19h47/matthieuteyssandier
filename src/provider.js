import React, { createContext, useState } from 'react';

const initialState = {
    active: false,
    toggle: () => { },
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
    const [menu, setMenu] = useState(false);
    const [color, setColor] = useState(null);

    return <AppContext.Provider value={{ menu, setMenu, color, setColor }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
