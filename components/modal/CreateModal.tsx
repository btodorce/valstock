import { memo, useState } from "react";
import { Modal } from "..";
import { useFavoriteAlbums } from "../../state";
import { Image } from "../../types";

import moment from "moment";
import { curry } from "lodash";

interface P {
    visible: boolean;
    photo: Image;
    onClose: () => void;
}

export const CreateModal = memo(
    ({ visible, photo, onClose }: P): JSX.Element => {
        const [favoriteAlbums, setFavoriteAlbum] = useFavoriteAlbums();

        const find = (name: string) =>
            favoriteAlbums?.find?.(album => album.name === name);

        return (
            <Modal
                visible={visible}
                onSave={({ action, album, title }) => {
                    const photos = find(title)?.photos;
                    if (action === "create") {
                        const newEntry = {
                            name: title,
                            createdAt: moment().toDate(),
                            photos: photos ? [...photos, photo] : [photo]
                        };
                        setFavoriteAlbum(
                            favoriteAlbums
                                ? [...favoriteAlbums, newEntry]
                                : [newEntry]
                        );
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
