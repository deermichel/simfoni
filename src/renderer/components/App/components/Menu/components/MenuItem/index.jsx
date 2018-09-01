import React from "react";
import PropTypes from "prop-types";
import styles from "./style.scss";
import Clickable from "~/components/Clickable";

const propTypes = {
    text: PropTypes.string,
    active: PropTypes.bool,
    icon: PropTypes.node,
    onClick: PropTypes.func,
};
const defaultProps = {
    text: "",
    active: false,
    icon: null,
    onClick: () => 0,
};

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

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
