import React from "react";
import PropTypes from "prop-types";
import { MoreVertical } from "react-feather";
import Button from "~/components/Button";
import styles from "./style.scss";

const propTypes = {
    onShowMenu: PropTypes.func,
};
const defaultProps = {
    onShowMenu: () => 0,
};

const MenuButton = ({ onShowMenu }) => (
    <div className={styles.menubutton}>
        <Button onClick={onShowMenu}>
            <div className={styles.hovercolor}>
                <MoreVertical size={20} />
            </div>
        </Button>
    </div>
);

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;

export default MenuButton;
