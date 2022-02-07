import { useTranslation } from "../../hooks";
import { InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import styles from "./image.module.scss";
import { Layout, Button, CreateModal } from "../../components";
import moment from "moment";
import { saveAs } from "file-saver";
import { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import classnames from "classnames";
import { unsplash } from "../../util";
import type { Image as ImageType } from "../../types";
import { ParsedUrlQuery } from "querystring";

interface P {
    photo: ImageType;
}

export const getServerSideProps = async ({
    query
}: {
    query: ParsedUrlQuery;
}) => {
    const { image } = query;
    const imageId = typeof image === "object" ? image[0] : image;
    const photo = (await unsplash.photos.get({ photoId: imageId })).response;

    return { props: { photo } };
};

const DetailPage: NextPage<P> = ({
    photo
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [svgProp] = useState({
        height: "30px",
        width: "30px"
    });
    const router = useRouter();
    const { _ } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ref, { height: viewHeight }] = useMeasure({
        polyfill: ResizeObserver
    });

    const handleDownload = () => saveAs(photo?.links?.download, "image.jpg");

    const toggleModal = () => setIsModalVisible(x => !x);

    const animProps = useSpring({
        height: isModalVisible ? viewHeight : 0,
        config: { tension: 5, friction: 10, clamp: true, duration: 300 },
        opacity: isModalVisible ? 1 : 0
    });
    return (
        <Layout>
            <div>
                {isModalVisible && (
                    <a.div style={{ overflow: "hidden", ...animProps }}>
                        <div ref={ref}>
                            <CreateModal
                                photo={photo}
                                visible={isModalVisible}
                                onClose={toggleModal}
                            />
                        </div>
                    </a.div>
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
                                    <svg pointerEvents="none" {...svgProp}>
                                        <path
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
                                <p>{_("messages.download")}</p>
                            </Button>
                        </div>
                        <div className={styles.content}>
                            <img
                                className={styles.displayImage}
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
                                {moment(photo?.created_at).format(
                                    "Do, MMMM YYYY"
                                )}
                            </p>
                            <Button
                                className={classnames(
                                    styles.btn,
                                    styles.btnGoBack
                                )}
                                onClick={() => router.back()}
                            >
                                {_("messages.go-back")}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default DetailPage;
