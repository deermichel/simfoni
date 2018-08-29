import React from "react";
import PropTypes from "prop-types";
import styles from "./style.scss";

const propTypes = {
    text: PropTypes.string,
    active: PropTypes.bool,
    icon: PropTypes.node,
};
const defaultProps = {
    text: "",
    active: false,
    icon: null,
};

const MenuItem = ({ text, active, icon }) => (
    <div className={(active) ? styles.active : styles.menuitem}>
        {icon && (
            <div className={styles.icon}>
                {icon}
            </div>
        )}
        {text}
    </div>
);

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
