import React from "react";
import PropTypes from "prop-types";
import styles from "./style.scss";

const propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
};
const defaultProps = {
    children: null,
    onClick: null,
};

const Button = ({ children, onClick }) => (
    <div className={styles.button} onClick={onClick}>
        {children}
    </div>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
