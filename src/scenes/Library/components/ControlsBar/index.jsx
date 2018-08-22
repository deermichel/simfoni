import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Map, List } from "immutable";
import SkipButton, { SkipDirection } from "./SkipButton";
import PlayButton from "./PlayButton";
import DurationBar from "./DurationBar";
import ScrollingText from "~/components/ScrollingText";
import PlayState from "~/constants/PlayState";
import styles from "./style.scss";

const propTypes = {
    nowPlaying: ImmutablePropTypes.contains({
        track: ImmutablePropTypes.contains({
            title: PropTypes.string,
            artist: PropTypes.string,
            album: PropTypes.string,
            duration: PropTypes.number,
        }),
        currentTime: PropTypes.number,
        state: PropTypes.oneOf(Object.values(PlayState)),
    }),
    onSkipForward: PropTypes.func,
    onSkipBackward: PropTypes.func,
    onPlay: PropTypes.func,
    onSeek: PropTypes.func,
};
const defaultProps = {
    nowPlaying: Map(),
    onSkipForward: () => 0,
    onSkipBackward: () => 0,
    onPlay: () => 0,
    onSeek: () => 0,
};

const ControlsBar = ({
    nowPlaying,
    onSkipForward,
    onSkipBackward,
    onPlay,
    onSeek,
}) => (
    <div className={styles.controlsbar}>
        <DurationBar
            currentTime={nowPlaying.get("currentTime")}
            totalTime={nowPlaying.getIn(["currentTrack", "duration"])}
            onSeek={onSeek}
        />
        <div className={styles.container}>
            <div className={styles.currenttitle}>
                <ScrollingText text={nowPlaying.getIn(["currentTrack", "title"])} />
            </div>
            <div className={styles.buttons}>
                <SkipButton
                    disabled={nowPlaying.get("history", List()).isEmpty()}
                    direction={SkipDirection.BACKWARD}
                    onSkip={onSkipBackward}
                />
                <PlayButton playing={nowPlaying.get("playState") === PlayState.PLAYING} onPlay={onPlay} />
                <SkipButton
                    disabled={nowPlaying.get("queue", List()).isEmpty()}
                    direction={SkipDirection.FORWARD}
                    onSkip={onSkipForward}
                />
            </div>
            <div className={styles.currentartist}>
                <ScrollingText text={nowPlaying.getIn(["currentTrack", "artist"])} />
            </div>
        </div>
    </div>
);

ControlsBar.propTypes = propTypes;
ControlsBar.defaultProps = defaultProps;

export default ControlsBar;
