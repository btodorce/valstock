import { useTranslation } from "../../hooks";
import { useFavoriteAlbums } from "../../state";
import { NextPage } from "next";
import { Button, DisplayImage, Layout } from "../../components";
import { useRouter } from "next/router";
import _ from "lodash";
import styles from "./index.module.scss";
import classnames from "classnames";
import type { Image } from "../../types";
import moment from "moment";
import { useMemo } from "react";

type Album = {
    createdAt?: Date;
    name: string;
    photos: Image[];
};

const AlbumPage: NextPage = () => {
    const { _ } = useTranslation();

    const router = useRouter();
    const { album } = router.query;
    const albumName = typeof album === "object" ? album[0] : album;

    const [favoriteAlbums] = useFavoriteAlbums();

    const useFindOneAlbum = (name: string) =>
        useMemo(
            () => favoriteAlbums?.find?.(album => album.name === name),
            [name]
        );

    const current = useFindOneAlbum(albumName);

    return (
        <Layout>
            {current && (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.headerText}>{current?.name}</h2>
                        <p className={styles.headerParagraph}>
                            {_("messages.date-created")}:{" "}
                            {moment(current?.createdAt).format("Do, MMMM YYYY")}
                        </p>
                    </div>
                    <div className={styles.content}>
                        {current?.photos?.map?.((item, key) => (
                            <DisplayImage
                                style={{
                                    padding: 10
                                }}
                                key={item.id}
                                image={item}
                            >
                                <div>
                                    <p>asdasd</p>
                                </div>
                            </DisplayImage>
                        ))}
                    </div>
                    <div>
                        <Button
                            className={classnames(styles.btn, styles.btnGoBack)}
                            onClick={() => router.back()}
                        >
                            {_("messages.go-back")}
                        </Button>
                        <Button
                            className={classnames(styles.btn, styles.btnSave)}
                            onClick={() => router.back()}
                        >
                            {_("messages.save")}
                        </Button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default AlbumPage;
