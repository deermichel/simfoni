import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { List, Map } from "immutable";
import PlayState from "~/constants/PlayState";
import Menu from "./components/Menu";
import ControlsBar from "./components/ControlsBar";
import styles from "./style.scss";

const propTypes = {
    children: PropTypes.node,
    tracks: ImmutablePropTypes.list,
    nowPlaying: ImmutablePropTypes.map,
    onPlayQueue: PropTypes.func,
    onSkipForward: PropTypes.func,
    onSkipBackward: PropTypes.func,
    onTogglePlayback: PropTypes.func,
    onSeek: PropTypes.func,
    onMute: PropTypes.func,
    onSetVolume: PropTypes.func,
};
const defaultProps = {
    children: null,
    tracks: List(),
    nowPlaying: Map(),
    onPlayQueue: () => 0,
    onSkipForward: () => 0,
    onSkipBackward: () => 0,
    onTogglePlayback: () => 0,
    onSeek: () => 0,
    onMute: () => 0,
    onSetVolume: () => 0,
};

const onPlay = (onPlayQueue, onTogglePlayback, tracks, nowPlaying) => {
    if (nowPlaying.get("playState") === PlayState.STOPPED) {
        // onClickTrack(onPlayQueue, tracks, tracks.first().get("id"));
        // console.error("todo");
    } else {
        onTogglePlayback();
    }
};

const App = ({
    children,
    tracks,
    nowPlaying,
    onPlayQueue,
    onSkipForward,
    onSkipBackward,
    onTogglePlayback,
    onSeek,
    onMute,
    onSetVolume,
}) => (
    <div className={styles.app}>
        <div className={styles.mainframe}>
            <Menu />
            {children}
        </div>
        <ControlsBar
            nowPlaying={nowPlaying}
            onSkipForward={onSkipForward}
            onSkipBackward={onSkipBackward}
            onPlay={() => onPlay(onPlayQueue, onTogglePlayback, tracks, nowPlaying)}
            onSeek={onSeek}
            onMute={onMute}
            onSetVolume={onSetVolume}
        />
    </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
