import React from "react";
import PropTypes from "prop-types";
import Clickable from "../Clickable";
import styles from "./style.scss";

const propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.func,
};
const defaultProps = {
    onClick: null,
    disabled: false,
    icon: () => "null",
};

const IconButton = ({ icon, onClick, disabled }) => (
    <div className={styles.iconbutton}>
        <Clickable onClick={onClick} disabled={disabled}>
            {React.createElement(icon)}
        </Clickable>
    </div>
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
