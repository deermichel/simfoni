import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Map, List } from "immutable";
import Button from "~/components/Button";
import Track from "./Track";
import Header from "./Header";
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
    icons: ImmutablePropTypes.map,
    onClickTrack: PropTypes.func,
};
const defaultProps = {
    tracks: List(),
    icons: Map(),
    onClickTrack: () => 0,
};

const TrackList = ({ tracks, icons, onClickTrack }) => (
    <div className={styles.tracklist}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.tracks}>
            {tracks.map((track) => (
                <div className={styles.trackitem} key={track.get("id")}>
                    <Button onClick={() => onClickTrack(track.get("id"))}>
                        <Track track={track} icon={icons.get(track.get("id"))} />
                    </Button>
                </div>
            ))}
        </div>
    </div>
);

TrackList.propTypes = propTypes;
TrackList.defaultProps = defaultProps;

export default TrackList;
