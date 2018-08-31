import React from "react";
import PropTypes from "prop-types";
import { Play, Pause } from "react-feather";
import IconButton, { ButtonSize } from "~/components/IconButton";

const propTypes = {
    onPlay: PropTypes.func,
    playing: PropTypes.bool,
    disabled: PropTypes.bool,
};
const defaultProps = {
    onPlay: null,
    playing: false,
    disabled: false,
};

export const PlayWithMargin = ({ size }) => ( // looks better
    <div style={{ display: "grid", marginLeft: 5 }}>
        <Play size={size} />
    </div>
);
PlayWithMargin.propTypes = { size: PropTypes.number.isRequired };

const PlayButton = ({ onPlay, playing, disabled }) => (
    <IconButton
        onClick={onPlay}
        disabled={disabled}
        icon={(playing) ? Pause : PlayWithMargin}
        size={ButtonSize.LARGE}
    />
);

PlayButton.propTypes = propTypes;
PlayButton.defaultProps = defaultProps;

export default PlayButton;
