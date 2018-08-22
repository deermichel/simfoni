import React from "react";
import PropTypes from "prop-types";
import styles from "./style.scss";

const propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};
const defaultProps = {
    children: null,
    onClick: null,
    disabled: false,
};

const Button = ({ children, onClick, disabled }) => (
    <div
        className={(disabled) ? styles.disabledbutton : styles.button}
        onClick={(disabled) ? () => 0 : onClick}
    >
        {children}
    </div>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
