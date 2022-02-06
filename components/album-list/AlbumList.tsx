import { useAlbums } from "../../hooks";

interface P {
    onSelect: (album: string) => void;
}

const AlbumList = ({ onSelect, ...props }: P): JSX.Element => {
    const { albums } = useAlbums();
    return <select {...props}></select>;
};
