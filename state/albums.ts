import moment from "moment";
import { atom, useRecoilState } from "recoil";
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
    default: null,
    effects_UNSTABLE: [persistAtom]
});

export const useFavoriteAlbums = () => useRecoilState(albumsAtom);
