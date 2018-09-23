import React from "react";
import { MoreVertical } from "react-feather";
import IconButton, { ButtonSize } from "~/components/IconButton";

const MenuButton = ({ onShowMenu }) => (
    <IconButton
        onClick={onShowMenu}
        icon={MoreVertical}
        size={ButtonSize.SMALL}
    />
);

export default MenuButton;
