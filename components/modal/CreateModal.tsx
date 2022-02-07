import { memo } from "react";
import { Modal } from "..";
import { useFavoriteAlbums } from "../../state";
import { Image } from "../../types";
import moment from "moment";

interface P {
    visible: boolean;
    photo: Image;
    onClose: () => void;
}

export const CreateModal = memo(
    ({ visible, photo, onClose }: P): JSX.Element => {
        const [favoriteAlbums, setFavoriteAlbum] = useFavoriteAlbums();

        return (
            <Modal
                visible={visible}
                onSave={({ action, album, title }) => {
                    if (action === "create") {
                        const newEntry = {
                            name: title,
                            createdAt: moment().toDate(),
                            photos: [photo]
                        };
                        setFavoriteAlbum([...(favoriteAlbums ?? []), newEntry]);
                    } else {
                        const updatedState = album?.map?.(album => {
                            const current = favoriteAlbums?.find?.(
                                curr => curr.name === album
                            );
                            const photosReducedState =
                                current?.photos?.filter?.(
                                    curr => curr.id !== photo.id
                                );
                            const state = {
                                name: current.name,
                                createdAt: current.createdAt,
                                photos: current.photos
                                    ? [...photosReducedState, photo]
                                    : [photo]
                            };
                            return state;
                        });
                        const reducedState = favoriteAlbums?.filter?.(
                            ({ name }) =>
                                name !==
                                updatedState?.find?.(
                                    inner => inner.name === name
                                )?.name
                        );
                        setFavoriteAlbum([
                            ...(reducedState ?? []),
                            ...(updatedState ?? [])
                        ]);
                    }
                }}
                onClose={onClose}
                albums={favoriteAlbums}
            />
        );
    }
);

CreateModal.displayName = "CreateModal";
export default CreateModal;
