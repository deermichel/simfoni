import React from "react";
import PropTypes from "prop-types";

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

const Clickable = ({ children, onClick, disabled }) => (
    <div onClick={(disabled) ? null : onClick}>
        {children}
    </div>
);

Clickable.propTypes = propTypes;
Clickable.defaultProps = defaultProps;

export default Clickable;
