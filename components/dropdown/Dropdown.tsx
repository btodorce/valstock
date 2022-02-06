import React, { FC, memo, ReactNode, useState } from "react";
import useMeasure from "react-use-measure";
import { useSpring, a } from "@react-spring/web";
import styles from "./index.module.scss";
import { ResizeObserver } from "@juggle/resize-observer";

export interface P {
    title: string;
    children: ReactNode;
}

export const Dropdown: FC<P> = ({ title, children }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [ref, { height: viewHeight }] = useMeasure({
        polyfill: ResizeObserver,
    });

    const animProps = useSpring({
        height: isOpened ? viewHeight : 0,
        config: { tension: 250, friction: 32, clamp: true, duration: 150 },
        opacity: isOpened ? 1 : 0,
    });

    const handleClickEvent = () => setIsOpened((x) => !x);

    return (
        <div
            className={styles.root}
            role="button"
            tabIndex={0}
            aria-expanded={isOpened}
            onClick={handleClickEvent}
        >
            <div className={styles.header}>
                <span className={styles.label}>{title}</span>
            </div>
            <a.div style={{ overflow: "hidden", ...animProps }}>
                <div ref={ref} className={styles.content}>
                    {children}
                </div>
            </a.div>
        </div>
    );
};

Dropdown.displayName = "Dropdown";
export default memo(Dropdown);
