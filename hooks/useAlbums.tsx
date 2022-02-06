import { useRecoilState } from "recoil";
import { albumsAtom } from "../state/albums";
import { useTranslation } from ".";
import moment from "moment";
import type { Image } from "../types";

interface P {
    createdAt: number;
    name: string;
    photos: Image[];
}

export const useAlbums = () => {
    const [albums, setAlbums] = useRecoilState<P[]>(albumsAtom);
    const { _ } = useTranslation();

    const exists = (name: string) =>
        albums?.find?.(album => album?.name === name);

    const photos = (photo: Image, name: string) =>
        albums?.map?.(
            album =>
                album.name === name &&
                album.photos?.find(p => p.id === photo.id)
        );

    const createNewAlbum = (name: string, photo: Image) => {
        const newAlbum = {
            name,
            photos: [photo],
            createdAt: moment().unix()
        };
        setAlbums(albums ? [...albums, newAlbum] : [newAlbum]);
    };

    const addToExisting = (photo: Image, name: string) => {
        const photoExists = photos(photo, name);
        const state = exists(name);
        const newState = [...state.photos, photo];
        console.log("photo exists", photoExists);
        console.log("new state", state);
        if (!photoExists) {
            setAlbums([
                ...albums,
                {
                    ...state,
                    photos: newState
                }
            ]);
        }
    };

    return { albums, createNewAlbum, addToExisting };
};
