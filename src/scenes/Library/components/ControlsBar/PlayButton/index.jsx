import React from "react";
import PropTypes from "prop-types";
import { Play, Pause } from "react-feather";
import Button from "~/components/Button";

const propTypes = {
    onPlay: PropTypes.func,
    playing: PropTypes.bool,
};
const defaultProps = {
    onPlay: null,
    playing: false,
};

const PlayButton = ({ onPlay, playing }) => (
    <Button onClick={onPlay}>
        {playing
            ? <Pause size={32} />
            : <Play size={32} />
        }
    </Button>
);

PlayButton.propTypes = propTypes;
PlayButton.defaultProps = defaultProps;

export default PlayButton;
