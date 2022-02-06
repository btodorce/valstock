import { memo } from "react";
import { Modal } from "..";
import { useAlbums } from "../../hooks";
import { Image } from "../../types";

import { useFilteredAlbums } from "../../state/albums";

interface P {
    visible: boolean;
    photo: Image;
    onClose: () => void;
}

export const CreateModal = memo(
    ({ visible, photo, onClose }: P): JSX.Element => {
        const { albums, createNewAlbum } = useAlbums();
        const [something, setSomething] = useFilteredAlbums("new test album");

        return (
            <Modal
                visible={visible}
                onSave={({ action, album, title }) => {
                    if (action === "create") {
                        console.log("title", title);
                        setSomething({ title, photo });
                    } else {
                        album?.forEach?.(album => {});
                    }
                }}
                onClose={onClose}
                albums={albums}
            />
        );
    }
);

CreateModal.displayName = "CreateModal";
export default CreateModal;
