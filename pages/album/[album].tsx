import { useFindOneAlbum, useTranslation, usePhotos } from "../../hooks";
import { NextPage } from "next";
import { Button, DisplayImage, Layout } from "../../components";
import { useRouter } from "next/router";
import moment from "moment";
import _ from "lodash";
import styles from "./index.module.scss";
import classnames from "classnames";
import { useMemo } from "react";

const AlbumPage: NextPage = () => {
    const { _ } = useTranslation();

    const router = useRouter();
    const { album } = router.query;
    const albumName = typeof album === "object" ? album[0] : album;

    const { album: current } = useFindOneAlbum(albumName);
    const { photos } = usePhotos();
    const albumPhotos = useMemo(() => {
        return photos?.filter?.(p => p.album === current.name);
    }, [current.name, photos]);

    console.log("album", current);
    console.log("album photos", albumPhotos);

    return (
        <Layout>
            {albumPhotos && (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.headerText}>{current?.name}</h2>
                        <p className={styles.headerParagraph}>
                            {_("messages.date-created")}:{" "}
                            {moment(current?.createdAt).format("Do, MMMM YYYY")}
                        </p>
                    </div>
                    <div className={styles.content}>
                        {albumPhotos?.map?.((item, key) => (
                            <DisplayImage
                                style={{
                                    padding: 10
                                }}
                                key={key}
                                image={item?.photo}
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
