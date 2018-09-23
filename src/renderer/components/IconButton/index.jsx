import React from "react";
import Clickable from "../Clickable";
import styles from "./style.scss";

export const ButtonSize = {
    LARGE: { style: "large", iconSize: 32 },
    MEDIUM: { style: "medium", iconSize: 24 },
    SMALL: { style: "small", iconSize: 20 },
};

const IconButton = ({
    icon = () => "null",
    onClick,
    disabled,
    size = ButtonSize.MEDIUM,
    destructive,
}) => (
    <div className={`${styles.iconbutton} ${styles[size.style]}`}>
        <Clickable onClick={onClick} disabled={disabled}>
            <div
                className={`
                    ${(disabled) ? styles.disabled : styles.container}
                    ${(destructive) ? styles.destructive : ""}
                `}
            >
                {React.createElement(icon, { size: size.iconSize })}
            </div>
        </Clickable>
    </div>
);

export default IconButton;
