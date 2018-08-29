import React from "react";
import PropTypes from "prop-types";
import Button from "~/components/Button";
import styles from "./style.scss";

const propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.node,
    destructive: PropTypes.bool,
};
const defaultProps = {
    onClick: () => 0,
    icon: null,
    destructive: false,
};

const IconButton = ({ onClick, icon, destructive }) => (
    <div className={styles.iconbutton}>
        <Button onClick={onClick}>
            <div className={(destructive) ? styles.destructive : styles.hovercolor}>
                {icon}
            </div>
        </Button>
    </div>
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
