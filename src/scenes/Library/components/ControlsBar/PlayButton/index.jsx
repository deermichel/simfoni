import React from "react";
import PropTypes from "prop-types";
import { Play } from "react-feather";
import Button from "~/components/Button";

const propTypes = {
    onPlay: PropTypes.func,
};
const defaultProps = {
    onPlay: null,
};

const PlayButton = ({ onPlay }) => (
    <Button className="playButton" onClick={onPlay}>
        <Play />
    </Button>
);

PlayButton.propTypes = propTypes;
PlayButton.defaultProps = defaultProps;

export default PlayButton;
