import React from "react";
import { List, Map } from "immutable";
import PlayState from "~/constants/PlayState";
import Menu from "./components/Menu";
import ControlsBar from "./components/ControlsBar";
import styles from "./style.scss";

const onPlay = (onPlayQueue, onTogglePlayback, tracks, nowPlaying) => {
    if (nowPlaying.get("playState") === PlayState.STOPPED) {
        const queue = List(tracks.map((track) => track.id));
        onPlayQueue(queue, List());
    } else {
        onTogglePlayback();
    }
};

const App = ({
    children,
    tracks = [],
    nowPlaying = Map(),
    ui = Map(),
    onPlayQueue,
    onSkipForward,
    onSkipBackward,
    onTogglePlayback,
    onSeek,
    onMute,
    onSetVolume,
    onToggleMenu,
    onNavigate = {},
    location = {},
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

export default App;
