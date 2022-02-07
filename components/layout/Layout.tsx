import { FC, ReactNode } from "react";
import styles from "./Layout.module.scss";
import Link from "next/link";
import { Dropdown } from "../";
import logo from "../../public/Site Logo.svg";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useFavoriteAlbums } from "../../state";

interface P {
    footer?: ReactNode;
}

export const Layout: FC<P> = ({ footer, children }) => {
    const [albums] = useFavoriteAlbums();
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)"
    });

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <span className={styles.wrapper}>
                    <Link passHref href="/">
                        <Image
                            className={styles.text}
                            src={logo}
                            alt="valstock"
                        />
                    </Link>
                    {albums?.length && (
                        <div className={styles.btn}>
                            <Dropdown title="My Albums">
                                {albums?.map(({ name }, key) => {
                                    return (
                                        <Link
                                            passHref
                                            key={key}
                                            href={`/album/${name}`}
                                        >
                                            <h1>{name}</h1>
                                        </Link>
                                    );
                                })}
                            </Dropdown>
                        </div>
                    )}
                </span>
            </div>
            <div className={styles.container}>{children}</div>
            {footer && (
                <div className={styles.footer}>
                    <div className={styles.footerContent}>{footer}</div>
                </div>
            )}
        </div>
    );
};

Layout.displayName = "Layout";
export default Layout;
