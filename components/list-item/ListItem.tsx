import classnames from "classnames";
import { memo, useState } from "react";
import styles from "./ListItem.module.scss";
import checkmark from "../../public/checkmark.svg";
import { Album } from "../../types";

interface P {
    item: Album;
    id: number;
    selected: boolean;
    onSave: (index: number, value: string) => void;
    onDelete: (index: number) => void;
}

const ListItem = memo(
    ({ item, id, selected, onSave, onDelete }: P): JSX.Element => {
        const title = item?.name;
        const [isToggled, setIsToggled] = useState(false);
        const style =
            isToggled || selected
                ? {
                      listStyleImage: `url(${checkmark.src})`,
                  }
                : { listStyle: "none" };

        return (
            <li
                style={style}
                className={
                    (classnames(styles.listText),
                    isToggled ? styles.selected : styles.unselected)
                }
                onClick={() => {
                    setIsToggled((x) => !x);
                    !isToggled ? onSave(id, title) : onDelete(id);
                }}
            >
                {title}
            </li>
        );
    }
);

ListItem.displayName = "ListItem";
export default ListItem;
