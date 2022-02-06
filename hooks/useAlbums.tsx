import { useState } from "react";
import { useRecoilState } from "recoil";
import { albumsAtom } from "../state/albums";
import { useTranslation } from ".";
import moment from "moment";

interface P {
    createdAt: number;
    name: string;
}

const exists = (albums: P[], name: string) =>
    albums?.find?.((album) => album?.name === name);

export const useAlbums = () => {
    const [albums, setAlbums] = useRecoilState<P[]>(albumsAtom);
    const [error, setError] = useState<string>();
    const { _ } = useTranslation();

    const save = (name: string) => {
        const newAlbum = {
            createdAt: moment().unix(),
            name,
        };

        if (exists) {
            console.error(_("messages.duplicate"));
            setError(_("messages.duplicate"));
            return null;
        }

        setAlbums(albums ? [...albums, newAlbum] : [newAlbum]);
    };

    return { albums, save, error };
};

export const useFindOneAlbum = (name: string) => {
    const { albums } = useAlbums();
    const album = exists(albums, name);
    return { album };
};
