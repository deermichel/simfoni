import React from "react";
import { List, Map } from "immutable";
import { Play, Pause } from "react-feather";
import TrackList from "./components/TrackList";
import PlayState from "~/constants/PlayState";
import styles from "./style.scss";

const onClickTrack = (onPlayQueue, tracks, trackId) => {
    const trackIds = List(tracks.map((track) => track.id));
    const queue = trackIds.skipUntil((id) => id === trackId);
    const history = trackIds.takeUntil((id) => id === trackId);
    onPlayQueue(queue, history.reverse());
};

const icons = (nowPlaying) => Map({
    [nowPlaying.getIn(["currentTrack", "id"])]:
        (nowPlaying.get("playState") === PlayState.PLAYING)
            ? <Play size={16} />
            : <Pause size={16} />,
});

const Songs = ({
    tracks = [],
    nowPlaying = Map(),
    onPlayQueue,
}) => (
    <div className={styles.songs}>
        <TrackList
            tracks={tracks}
            icons={icons(nowPlaying)}
            onClickTrack={(trackId) => onClickTrack(onPlayQueue, tracks, trackId)}
        />
    </div>
);

export default Songs;
