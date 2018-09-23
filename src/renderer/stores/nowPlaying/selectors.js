import { createSelector } from "reselect";
import { Map } from "immutable";
import { librarySelectors } from "../library";

const getTracks = (state) => librarySelectors.getTracks(state);
const getNowPlaying = (state) => state.nowPlaying;

const getNowPlayingWithTrack = createSelector(
    [getTracks, getNowPlaying],
    (tracks, nowPlaying) => {
        const trackId = nowPlaying.get("currentTrack", "");
        const track = Map(tracks.find((t) => t.id === trackId));

        const nowPlayingWithTrack = nowPlaying.set("currentTrack", track);
        return nowPlayingWithTrack;
    },
);

export default {
    getNowPlayingWithTrack,
};
