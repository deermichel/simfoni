import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Map } from "immutable";
import SkipButton, { SkipDirection } from "./components/SkipButton";
import PlayButton from "./components/PlayButton";
import DurationBar from "./components/DurationBar";
import ScrollingText from "~/components/ScrollingText";
import PlayState from "~/constants/PlayState";
import styles from "./style.scss";
import VolumeControl from "./components/VolumeControl";
import MenuButton from "./components/MenuButton";

const propTypes = {
    nowPlaying: ImmutablePropTypes.map,
    onSkipForward: PropTypes.func,
    onSkipBackward: PropTypes.func,
    onPlay: PropTypes.func,
    onSeek: PropTypes.func,
    onMute: PropTypes.func,
    onSetVolume: PropTypes.func,
    onShowMenu: PropTypes.func,
};
const defaultProps = {
    nowPlaying: Map(),
    onSkipForward: () => 0,
    onSkipBackward: () => 0,
    onPlay: () => 0,
    onSeek: () => 0,
    onMute: () => 0,
    onSetVolume: () => 0,
    onShowMenu: () => 0,
};

const ControlsBar = ({
    nowPlaying,
    onSkipForward,
    onSkipBackward,
    onPlay,
    onSeek,
    onMute,
    onSetVolume,
    onShowMenu,
}) => (
    <div className={styles.controlsbar}>
        <DurationBar
            currentTime={nowPlaying.get("currentTime")}
            totalTime={nowPlaying.getIn(["currentTrack", "duration"])}
            onSeek={onSeek}
        />
        <div className={styles.container}>
            <div className={styles.menubutton}>
                <MenuButton onShowMenu={onShowMenu} />
            </div>
            <div className={styles.currenttitle}>
                <ScrollingText text={nowPlaying.getIn(["currentTrack", "title"])} />
            </div>
            <div className={styles.buttons}>
                <SkipButton
                    disabled={nowPlaying.get("playState") === PlayState.STOPPED}
                    direction={SkipDirection.BACKWARD}
                    onSkip={onSkipBackward}
                />
                <PlayButton playing={nowPlaying.get("playState") === PlayState.PLAYING} onPlay={onPlay} />
                <SkipButton
                    disabled={nowPlaying.get("playState") === PlayState.STOPPED}
                    direction={SkipDirection.FORWARD}
                    onSkip={onSkipForward}
                />
            </div>
            <div className={styles.currentartist}>
                <ScrollingText text={nowPlaying.getIn(["currentTrack", "artist"])} />
            </div>
            <div className={styles.volumecontrol}>
                <VolumeControl
                    onMute={onMute}
                    onSetVolume={onSetVolume}
                    volume={nowPlaying.get("volume")}
                    muted={nowPlaying.get("muted")}
                />
            </div>
        </div>
    </div>
);

ControlsBar.propTypes = propTypes;
ControlsBar.defaultProps = defaultProps;

export default ControlsBar;