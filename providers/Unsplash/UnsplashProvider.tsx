import React, { createContext, FC, useContext } from "react";

import { createApi } from "unsplash-js";

const Context = createContext(null);

export const UnsplashProvider: FC = ({ children }) => {
    const unsplash = createApi({
        accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    });
    return <Context.Provider value={unsplash}>{children}</Context.Provider>;
};

export const useUnsplash = () => useContext(Context);

export default UnsplashProvider;
