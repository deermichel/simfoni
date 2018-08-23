import React from "react";
import PropTypes from "prop-types";
import { Play, Pause } from "react-feather";
import Button from "~/components/Button";
import styles from "./style.scss";

const propTypes = {
    onPlay: PropTypes.func,
    playing: PropTypes.bool,
};
const defaultProps = {
    onPlay: null,
    playing: false,
};

export const PlayWithMargin = () => ( // looks better
    <div style={{ display: "grid", marginLeft: 5 }}>
        <Play size={32} />
    </div>
);

const PlayButton = ({ onPlay, playing }) => (
    <div className={styles.playbutton}>
        <Button onClick={onPlay}>
            <div className={styles.hovercolor}>
                {playing
                    ? <Pause size={32} />
                    : <PlayWithMargin />
                }
            </div>
        </Button>
    </div>
);

PlayButton.propTypes = propTypes;
PlayButton.defaultProps = defaultProps;

export default PlayButton;
