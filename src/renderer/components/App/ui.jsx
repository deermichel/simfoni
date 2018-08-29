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
    ui: ImmutablePropTypes.map,
    onPlayQueue: PropTypes.func,
    onSkipForward: PropTypes.func,
    onSkipBackward: PropTypes.func,
    onTogglePlayback: PropTypes.func,
    onSeek: PropTypes.func,
    onMute: PropTypes.func,
    onSetVolume: PropTypes.func,
    onToggleMenu: PropTypes.func,
    onNavigate: PropTypes.shape({
        artists: PropTypes.func,
        albums: PropTypes.func,
        songs: PropTypes.func,
        settings: PropTypes.func,
    }),
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};
const defaultProps = {
    children: null,
    tracks: List(),
    nowPlaying: Map(),
    ui: Map(),
    onPlayQueue: () => 0,
    onSkipForward: () => 0,
    onSkipBackward: () => 0,
    onTogglePlayback: () => 0,
    onSeek: () => 0,
    onMute: () => 0,
    onSetVolume: () => 0,
    onToggleMenu: () => 0,
    onNavigate: {},
    location: {},
};

const onPlay = (onPlayQueue, onTogglePlayback, tracks, nowPlaying) => {
    if (nowPlaying.get("playState") === PlayState.STOPPED) {
        const queue = tracks.map((track) => track.get("id"));
        onPlayQueue(queue, List());
    } else {
        onTogglePlayback();
    }
};

const App = ({
    children,
    tracks,
    nowPlaying,
    ui,
    onPlayQueue,
    onSkipForward,
    onSkipBackward,
    onTogglePlayback,
    onSeek,
    onMute,
    onSetVolume,
    onToggleMenu,
    onNavigate,
    location,
}) => (
    <div className={styles.app}>
        <div className={styles.mainframe}>
            <Menu
                show={ui.get("showMenu")}
                onNavigate={onNavigate}
                location={location}
            />
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
            onShowMenu={onToggleMenu}
        />
    </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
