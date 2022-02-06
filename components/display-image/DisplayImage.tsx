import _ from "lodash";
import { FC, ImgHTMLAttributes, useState } from "react";
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
    const [isVisible, setIsVisible] = useState(false);

    const handleVisibilityChange = () => setIsVisible((x) => !x);

    return (
        <div
            className={styles.container}
            onMouseOver={handleVisibilityChange}
            onMouseOut={handleVisibilityChange}
        >
            <a href={href}>
                <img
                    src={image?.urls?.small}
                    key={image.id}
                    alt={image.description}
                    loading="lazy"
                    {...rest}
                />
            </a>
            {isVisible && <div className={styles.footer}>{children}</div>}
        </div>
    );
};
