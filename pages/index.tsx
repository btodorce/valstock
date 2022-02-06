import { unsplash } from "../util";
import { InferGetServerSidePropsType, NextPage } from "next";
import type { Image } from "../types";
import { DisplayImage, Layout } from "../components";
import styles from "../views/dashboard/index.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";

interface P {
    photos: Image[];
    count: number;
}

enum OrderBy {
    LATEST = "latest",
    POPULAR = "popular",
    VIEWS = "views",
    DOWNLOADS = "downloads",
    OLDEST = "oldest"
}

const defaultParams = {
    page: 1,
    perPage: 30,
    orderBy: OrderBy.VIEWS
};
export const getServerSideProps = async () => {
    const { total, results } = (await unsplash.photos.list(defaultParams))
        .response;
    const count = total;
    const photos = results;

    return { props: { photos, count } };
};

const Index: NextPage<P> = ({
    photos,
    count
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const routePrefix = "detail";
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(count);
    const [allPhotos, setAllPhotos] = useState(photos);
    const ref = useRef();

    const params = useMemo(() => {
        return {
            page: page,
            perPage: defaultParams.perPage,
            orderBy: defaultParams.orderBy
        };
    }, [page]);

    const fetchMore = useCallback(async () => {
        const { total, results } = (await unsplash.photos.list(params))
            .response;
        setAllPhotos(x => [...x, ...results]);
        setTotalCount(total);
    }, [params]);

    useEffect(() => {
        fetchMore();
    }, [fetchMore]);

    const handleSetNextPage = () => setPage(page + 1);

    return (
        <Layout>
            <div className={styles.container} ref={ref}>
                <InfiniteScroll
                    dataLength={allPhotos.length}
                    next={handleSetNextPage}
                    hasMore={true}
                    scrollThreshold="90%"
                    loader={<h1>....</h1>}
                >
                    {allPhotos?.map((image: Image) => (
                        <DisplayImage
                            image={image}
                            key={image.id}
                            href={`${routePrefix}/${image.id}`}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </Layout>
    );
};

export default Index;
