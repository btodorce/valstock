import { unsplash } from "../util";
import { InferGetServerSidePropsType, NextPage } from "next";
import type { Image } from "../types";
import { DisplayImage, Layout } from "../components";
import styles from "../views/dashboard/index.module.scss";
import config from "../app.json";

interface P {
    photos: Image[];
    count: number;
}

const defaultParams = {
    page: 1,
    perPage: 30
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

    return (
        <Layout>
            <div className={styles.container}>
                {photos?.map((image: Image) => (
                    <DisplayImage
                        image={image}
                        key={image.id}
                        href={`${routePrefix}/${image.id}`}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Index;
