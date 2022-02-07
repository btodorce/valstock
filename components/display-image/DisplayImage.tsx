import _ from "lodash";
import Link from "next/link";
import { FC, ImgHTMLAttributes, memo, useState } from "react";
import { DetailedHTMLProps } from "react";
import type { Image } from "../../types";
import styles from "./DisplayImage.module.scss";

interface P {
    image: Image;
    href?: string;
    onClick?: (data: Image) => Promise<boolean> | void;
}

type ImageProps = Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    "src" | "key" | "alt"
>;
export const DisplayImage: FC<P & ImageProps> = ({
    image,
    href,
    children,
    ...rest
}): JSX.Element => {
    const [isVisible, setIsVisible] = useState(true);

    const handleVisibilityChange = () => setIsVisible(x => !x);

    if (!image) {
        return <></>;
    }
    return (
        <>
            <div
                className={styles.container}
                onMouseOver={handleVisibilityChange}
                onMouseOut={handleVisibilityChange}
            >
                <Link passHref href={href ?? ""}>
                    <img
                        src={image?.urls?.regular}
                        key={image?.id}
                        alt={image?.description}
                        loading="lazy"
                        {...rest}
                    />
                </Link>
                {isVisible && <div className={styles.footer}></div>}
            </div>
        </>
    );
};
DisplayImage.displayName = "DisplayImage";
export default DisplayImage;
