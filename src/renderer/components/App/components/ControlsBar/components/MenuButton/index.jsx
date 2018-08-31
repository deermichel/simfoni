import React from "react";
import PropTypes from "prop-types";
import { MoreVertical } from "react-feather";
import IconButton, { ButtonSize } from "~/components/IconButton";

const propTypes = {
    onShowMenu: PropTypes.func,
};
const defaultProps = {
    onShowMenu: () => 0,
};

const MenuButton = ({ onShowMenu }) => (
    <IconButton
        onClick={onShowMenu}
        icon={MoreVertical}
        size={ButtonSize.SMALL}
    />
);

MenuButton.propTypes = propTypes;
MenuButton.defaultProps = defaultProps;

export default MenuButton;
