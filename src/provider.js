import React, { createContext, useState } from 'react';

const initialState = {
    active: false,
    toggle: () => { },
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState(null);

    const toggleActive = () => setActive(!active);
    const toggleColor = (color) => setColor(color);

    return <AppContext.Provider value={{ active, toggleActive, color, toggleColor }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
