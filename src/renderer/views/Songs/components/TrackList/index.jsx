import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Map, List } from "immutable";
import Clickable from "~/components/Clickable";
import Track from "./components/Track";
import Header from "./components/Header";
import styles from "./style.scss";

const propTypes = {
    tracks: ImmutablePropTypes.list,
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
                    <Clickable onClick={() => onClickTrack(track.get("id"))}>
                        <Track track={track} icon={icons.get(track.get("id"))} />
                    </Clickable>
                </div>
            ))}
        </div>
    </div>
);

TrackList.propTypes = propTypes;
TrackList.defaultProps = defaultProps;

export default TrackList;
