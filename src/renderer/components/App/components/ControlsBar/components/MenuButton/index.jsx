import React from "react";
import PropTypes from "prop-types";
import { MoreVertical } from "react-feather";
import Clickable from "~/components/Clickable";
import styles from "./style.scss";

const propTypes = {
    onShowMenu: PropTypes.func,
};
const defaultProps = {
    onShowMenu: () => 0,
};

const MenuButton = ({ onShowMenu }) => (
    <div className={styles.menubutton}>
        <Clickable onClick={onShowMenu}>
            <div className={styles.hovercolor}>
                <MoreVertical size={20} />
            </div>
        </Clickable>
    </div>
);

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;

export default MenuButton;
