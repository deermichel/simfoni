import React from "react";
import styles from "./style.scss";
import Clickable from "~/components/Clickable";

const MenuItem = ({
    text,
    active,
    icon,
    onClick,
}) => (
    <div className={styles.menuitem}>
        <Clickable onClick={onClick}>
            <div className={(active) ? styles.active : styles.inactive}>
                {icon && (
                    <div className={styles.icon}>
                        {icon}
                    </div>
                )}
                {text}
            </div>
        </Clickable>
    </div>
);

export default MenuItem;
