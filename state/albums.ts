import moment from "moment";
import { atom, selectorFamily, useRecoilState, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { Image } from "../types";

interface P {
    createdAt: Date | null;
    name: string;
    photos: Image[];
}

const { persistAtom } = recoilPersist();
export const albumsAtom = atom<P[]>({
    key: "albums",
    default: [
        {
            name: "",
            createdAt: null,
            photos: []
        }
    ],
    effects_UNSTABLE: [persistAtom]
});

export const useFavoriteAlbums = () => useRecoilState(albumsAtom);
