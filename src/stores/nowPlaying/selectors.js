import { createSelector } from "reselect";

const getTracks = (state) => state.tracks;
const getNowPlaying = (state) => state.nowPlaying;

const getNowPlayingWithTrack = createSelector(
    [getTracks, getNowPlaying],
    (tracks, nowPlaying) => {
        const trackId = nowPlaying.get("trackId", "");
        const track = tracks.find((t) => t.get("id") === trackId);

        const nowPlayingWithTrack = nowPlaying
            .remove("trackId")
            .set("track", track);
        return nowPlayingWithTrack;
    },
);

export default {
    getNowPlayingWithTrack,
};
