import React from "react";
import PropTypes from "prop-types";
import Clickable from "../Clickable";
import styles from "./style.scss";

export const ButtonSize = {
    LARGE: { style: "large", iconSize: 32 },
    MEDIUM: { style: "medium", iconSize: 24 },
    SMALL: { style: "small", iconSize: 20 },
};

const propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.func,
    size: PropTypes.oneOf(Object.values(ButtonSize)),
    destructive: PropTypes.bool,
};
const defaultProps = {
    onClick: null,
    disabled: false,
    icon: () => "null",
    size: ButtonSize.MEDIUM,
    destructive: false,
};

const IconButton = ({
    icon,
    onClick,
    disabled,
    size,
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

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
