import { useRecoilState } from "recoil";
import { photosAtom } from "../state";
import { Image, Photo } from "../types";

const find = (photos: Photo[], photo: Image, album: string) =>
    photos?.find?.((p) => p.album === album && p.photo.id === photo.id);

export const usePhotos = () => {
    const [photos, setPhotos] = useRecoilState<Photo[]>(photosAtom);
    const save = (photo: Image, album: string) => {
        const exists = find(photos, photo, album);
        const newPhoto = {
            album,
            photo,
        };
        if (exists) {
            return null;
        }
        setPhotos(!photos ? [newPhoto] : [...photos, newPhoto]);
    };

    return { photos, save };
};
