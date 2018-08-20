import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { List, Map } from "immutable";
import TrackList from "./components/TrackList";
import ControlsBar from "./components/ControlsBar";
import PlayState from "~/constants/PlayState";

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
};
const defaultProps = {
    tracks: List(),
    nowPlaying: Map(),
};

const Library = ({ tracks, nowPlaying }) => (
    <div className="library">
        <TrackList tracks={tracks} />
        <ControlsBar nowPlaying={nowPlaying} />
    </div>
);

Library.propTypes = propTypes;
Library.defaultProps = defaultProps;

export default Library;
