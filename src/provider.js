import React, { createContext, useState } from 'react';

const initialState = {
    active: false,
    toggle: () => { },
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
    const [menu, setMenu] = useState(false);
    const [color, setColor] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    return <AppContext.Provider value={{ menu, setMenu, color, setColor, position, setPosition }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
