import moment from "moment";
import { atom, selectorFamily, useRecoilState, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { Image } from "../types";

interface P {
    createdAt?: Date;
    name: string;
    photos: Image[];
}

const { persistAtom } = recoilPersist();
export const albumsAtom = atom<P[]>({
    key: "albums",
    default: [
        {
            name: "",
            photos: []
        }
    ],

    effects_UNSTABLE: [persistAtom]
});

const albumSelector = selectorFamily({
    key: "filteredAlbumsState",
    get:
        ({ name, photo }: { name: string; photo: Image }) =>
        ({ get }) => {
            const albums = get(albumsAtom);
            if (name && !photo) {
                return albums?.filter?.(album => album.name === name);
            }
            if (name && photo) {
                return albums
                    ?.find?.(album => album?.name === name)
                    ?.photos?.filter?.(curr => curr.id === photo.id);
            }
            return albums;
        },
    set:
        () =>
        ({ set, get }, { title, photo }) => {
            const albums = get<P[]>(albumsAtom);
            const filteredAlbum = albums?.find?.(album => album.name === title);
            const newAlbum = {
                name: title,
                photos: filteredAlbum
                    ? [...filteredAlbum?.photos, photo]
                    : [photo],
                createdAt: moment().toDate()
            };
            if (!albums) {
                set(albumsAtom, [newAlbum]);
            }
            if (filteredAlbum) {
                [...albums, newAlbum];
            }
        }
});

export const useFilteredAlbums = (name: string, photo?: Image) =>
    useRecoilState(albumSelector({ name, photo }));
