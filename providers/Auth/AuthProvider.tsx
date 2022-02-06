import { albumsAtom, photosAtom } from "../../state";
import React, { createContext, FC, ReactNode, useContext } from "react";
import { useRecoilState } from "recoil";
import type { User } from "../../types";
import { useAuthState, saveCredentials } from "../../hooks";
import Login from "../../views/login/index";
import moment from "moment";

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
        ret = !user?.me ? <Login /> : children;
    }

    const logUserIn = (username: string) =>
        setUser({
            me: {
                username,
                createdAt: moment().toNow()
            }
        });

    const clearState = () => {
        setUser(null);
        setAlbums(null);
        setPhotos(null);
    };

    return (
        <UserContext.Provider
            value={{
                me: user,
                async login(username, password) {
                    const result = saveCredentials(username, password).then(
                        () => logUserIn(username)
                    );
                },
                async logout() {
                    navigator.credentials
                        .preventSilentAccess()
                        .then(() => clearState());
                }
            }}
        >
            {ret}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
