import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { List, Map } from "immutable";
import { Play, Pause } from "react-feather";
import TrackList from "./components/TrackList";
import PlayState from "~/constants/PlayState";
import styles from "./style.scss";

const propTypes = {
    tracks: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            artist: PropTypes.string,
            album: PropTypes.string,
            duration: PropTypes.number,
        }),
    ),
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
    onPlayQueue: PropTypes.func,
};
const defaultProps = {
    tracks: List(),
    nowPlaying: Map(),
    onPlayQueue: () => 0,
};

const onClickTrack = (onPlayQueue, tracks, trackId) => {
    const trackIds = tracks.map((track) => track.get("id"));
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

const Library = ({
    tracks,
    nowPlaying,
    onPlayQueue,
}) => (
    <div className={styles.library}>
        <TrackList
            tracks={tracks}
            icons={icons(nowPlaying)}
            onClickTrack={(trackId) => onClickTrack(onPlayQueue, tracks, trackId)}
        />
    </div>
);

Library.propTypes = propTypes;
Library.defaultProps = defaultProps;

export default Library;
