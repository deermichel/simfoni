import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Map } from "immutable";
import styles from "./style.scss";

const propTypes = {
    track: ImmutablePropTypes.map,
    icon: PropTypes.node,
};
const defaultProps = {
    track: Map(),
    icon: null,
};

const Track = ({ track, icon }) => {
    const duration = track.get("duration");
    const formattedDuration = `${Math.trunc(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`;

    return (
        <div className={styles.track}>
            <span className={styles.icon}>
                {icon}
            </span>
            <span className={styles.title}>
                {track.get("title")}
            </span>
            <span className={styles.artist}>
                {track.get("artist")}
            </span>
            <span className={styles.album}>
                {track.get("album")}
            </span>
            <span className={styles.duration}>
                {duration && formattedDuration}
            </span>
        </div>
    );
};

Track.propTypes = propTypes;
Track.defaultProps = defaultProps;

export default Track;
