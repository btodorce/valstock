import { useCallback, useEffect, useMemo, useState } from "react";
import { useUnsplash } from "../providers/Unsplash/UnsplashProvider";
import { Image } from "../types";

export const useFindManyPhotos = (page: number, limit: number) => {
    const unsplash = useUnsplash();
    const [photos, setPhotos] = useState<Image[] | null>();
    const [count, setCount] = useState<number | null>();
    const [error, setError] = useState(false);

    const params = useMemo(() => {
        return {
            page: page ?? 1,
            perPage: limit ?? 30,
        };
    }, [page, limit]);

    const fetchPhotos = useCallback(async () => {
        try {
            const data = (await unsplash.photos.list(params)).response;
            setCount(data.count);
            setPhotos(data.results);
        } catch (error) {
            console.error(error);
            setError(true);
        }
    }, [params, unsplash.photos]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    return {
        photos,
        count,
        error,
    };
};

export default useFindManyPhotos;
