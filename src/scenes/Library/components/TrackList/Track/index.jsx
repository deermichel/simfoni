import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Map } from "immutable";

const propTypes = {
    track: ImmutablePropTypes.contains({
        title: PropTypes.string,
        artist: PropTypes.string,
        album: PropTypes.string,
        duration: PropTypes.number,
    }),
};
const defaultProps = {
    track: Map(),
};

const Track = ({ track }) => {
    const duration = track.get("duration");
    const formattedDuration = `${Math.trunc(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`;

    return (
        <div className="track">
            <span className="title">
                {track.get("title")}
            </span>
            <span className="artist">
                {track.get("artist")}
            </span>
            <span className="album">
                {track.get("album")}
            </span>
            <span className="duration">
                {duration && formattedDuration}
            </span>
        </div>
    );
};

Track.propTypes = propTypes;
Track.defaultProps = defaultProps;

export default Track;
