import { useFindManyPhotos, useTranslation } from "../../hooks";
import { NextPage } from "next";
import { useState } from "react";
import { Layout, DisplayImage } from "../../components";
import { Image as ImageType } from "../../types";
import styles from "./index.module.scss";

const Dashboard: NextPage = () => {
    const routePrefix = "detail";
    const [page, setPage] = useState(1);
    const limit = 50;
    const { _ } = useTranslation();

    const { count, photos, error } = useFindManyPhotos(page, limit);

    if (error) {
        return <h3>{_("messages.error")}</h3>;
    }
    return (
        <Layout>
            <div className={styles.container}>
                {photos?.map((image: ImageType, key) => (
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

export default Dashboard;
