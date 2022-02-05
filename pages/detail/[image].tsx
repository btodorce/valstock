import { useTranslation, useAlbums, usePhotos } from "../../hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { Layout, Button, Modal } from "../../components";
import moment from "moment";
import { saveAs } from "file-saver";
import { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import classnames from "classnames";
import { unsplash } from "../../util";
import type { Image as ImageType } from "../../types";

interface P {
    photo: ImageType;
}

const DetailPage: NextPage<P> = ({ photo }) => {
    const router = useRouter();
    const { _ } = useTranslation();
    const { albums, save: createNewAlbum } = useAlbums();
    const { photos, save } = usePhotos();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ref, { height: viewHeight }] = useMeasure({
        polyfill: ResizeObserver,
    });

    const handleDownload = () => saveAs(photo?.links?.download, "image.jpg");

    const toggleModal = () => setIsModalVisible((x) => !x);

    const animProps = useSpring({
        height: isModalVisible ? viewHeight : 0,
        config: { tension: 5, friction: 10, clamp: true, duration: 300 },
        opacity: isModalVisible ? 1 : 0,
    });
    return (
        <Layout>
            <div>
                {isModalVisible && (
                    <a.div style={{ overflow: "hidden", ...animProps }}>
                        <div ref={ref}>
                            <Modal
                                visible={isModalVisible}
                                onSave={(data) => {
                                    if (data?.action === "create") {
                                        createNewAlbum(data.title);
                                        save(photo, data.title);
                                    } else {
                                        data?.album?.forEach?.((album) => {
                                            save(photo, album);
                                        });
                                    }
                                }}
                                onClose={toggleModal}
                                albums={albums}
                            />
                        </div>
                    </a.div>
                )}
                {!photo && (
                    <div>
                        <h2>{_("messages.loading")}</h2>
                    </div>
                )}
                {photo && (
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <Button
                                className={classnames(
                                    styles.btn,
                                    styles.btnAddToAlbum
                                )}
                                onClick={toggleModal}
                            >
                                {_("messages.add-to-album")}
                                <div className={styles.innerImage}>
                                    <svg
                                        pointerEvents="none"
                                        width="10px"
                                        height="10px"
                                    >
                                        <path
                                            id="Icon_Add_"
                                            data-name="Icon (Add)"
                                            d="M-3.507-2.954V-5.026H3.507v2.072ZM-1.113-.532V-7.406H1.113V-.532Z"
                                            transform="translate(3.507 7.406)"
                                        />
                                    </svg>
                                </div>
                            </Button>
                            <Button
                                className={classnames(
                                    styles.btn,
                                    styles.btnDownload
                                )}
                                onClick={handleDownload}
                            >
                                {_("messages.download")}
                            </Button>
                        </div>
                        <img
                            src={photo?.urls?.regular}
                            alt={photo?.description}
                        />
                        <p className={styles.hParagraph}>
                            {_("messages.photos.uploaded-by")}
                        </p>
                        <p
                            className={styles.username}
                        >{`${photo?.user?.first_name} ${photo?.user?.last_name}`}</p>
                        <p className={styles.createdDate}>
                            {moment(photo?.created_at).format("Do, MMMM YYYY")}
                        </p>
                        <Button
                            className={classnames(styles.btn, styles.btnGoBack)}
                            onClick={() => router.back()}
                        >
                            {_("messages.go-back")}
                        </Button>
                    </div>
                )}
            </div>
        </Layout>
    );
};
export async function getServerSideProps(context) {
    const { image } = context.query;
    const imageId = typeof image === "object" ? image[0] : image;

    const photo = (await unsplash.photos.get({ photoId: imageId })).response;
    return { props: { photo } };
}

export default DetailPage;
