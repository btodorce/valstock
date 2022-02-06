import { albumsAtom, photosAtom } from "../../state";
import React, { createContext, FC, ReactNode, useContext } from "react";
import { useRecoilState } from "recoil";
import { useAuthState } from "../../hooks";

import Login from "../../views/login/index";

type User = {
    username: string;
};
interface P {
    me: User;
    logout: () => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
}

const defaultValue: P = { me: null, login: null, logout: null };
const UserContext = createContext(defaultValue);

export const UserProvider: FC = ({ children }) => {
    const [user, setUser] = useAuthState();
    const [_albums, setAlbums] = useRecoilState(albumsAtom);
    const [_photos, setPhotos] = useRecoilState(photosAtom);

    let ret: ReactNode = null;
    if (typeof window !== "undefined") {
        ret = !user ? <Login /> : children;
    }

    return (
        <UserContext.Provider
            value={{
                me: user,
                async login(username, _password) {
                    setUser({
                        me: {
                            username,
                        },
                    });
                },
                async logout() {
                    setUser(null);
                    setAlbums(null);
                    setPhotos(null);
                },
            }}
        >
            {ret}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
