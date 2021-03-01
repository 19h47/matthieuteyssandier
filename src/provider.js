import React, { createContext, useState } from 'react';

const initialState = {
    active: false,
    toggle: () => { },
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
    const [active, setActive] = useState(false);

    const toggle = () => setActive(!active);

    return <AppContext.Provider value={{ active, toggle }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
