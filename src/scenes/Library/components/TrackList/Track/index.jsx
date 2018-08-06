import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    track: PropTypes.shape({
        title: PropTypes.string,
        artist: PropTypes.string,
        album: PropTypes.string,
        duration: PropTypes.number,
    }),
};
const defaultProps = {
    track: {},
};

const Track = ({ track }) => {
    const {
        title,
        artist,
        album,
        duration,
    } = track;
    const formattedDuration = `${Math.trunc(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`;

    return (
        <div className="track">
            <span className="title">
                {title}
            </span>
            <span className="artist">
                {artist}
            </span>
            <span className="album">
                {album}
            </span>
            <span className="duration">
                {formattedDuration}
            </span>
        </div>
    );
};

Track.propTypes = propTypes;
Track.defaultProps = defaultProps;

export default Track;
