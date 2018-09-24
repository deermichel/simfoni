import React from "react";
import Clickable from "../Clickable";
import styles from "./style.scss";

const TextButton = ({
    text,
    icon,
    onClick,
    disabled,
    destructive,
}) => (
    <div className={`${styles.textbutton}`}>
        <Clickable onClick={onClick} disabled={disabled}>
            <div
                className={`
                    ${(disabled) ? styles.disabled : styles.container}
                    ${((icon) ? styles.withicon : "")}
                    ${(destructive) ? styles.destructive : ""}
                `}
            >
                {icon && React.createElement(icon, { size: 20 })}
                {text}
            </div>
        </Clickable>
    </div>
);

export default TextButton;
