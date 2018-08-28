import React from "react";
import PropTypes from "prop-types";
import styles from "./style.scss";

const propTypes = {
    show: PropTypes.bool,
};
const defaultProps = {
    show: true,
};

// later: make resizable?

const Menu = ({ show }) => (
    <div className={styles.menu}>
        <div className={(show) ? styles.container : styles.hidden} />
    </div>
);

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
