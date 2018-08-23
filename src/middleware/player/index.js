import AudioPlayer from "./audioPlayer";
import { nowPlayingOperations } from "~/stores/nowPlaying";
import PlayState from "~/constants/PlayState";

const player = new AudioPlayer();
let playingTrack = null;

const updateTime = (store, time) => {
    if (store.getState().nowPlaying.get("currentTime") !== Math.trunc(time)) { // less overhead
        store.dispatch(nowPlayingOperations.updateTime(time));
    }
};

const update = (store) => {
    const state = store.getState();

    // sync state
    if (state.nowPlaying.get("playState") !== PlayState.PLAYING) {
        player.pause();
        return;
    }

    // sync track
    const currentTrack = state.nowPlaying.get("currentTrack");
    if (currentTrack !== playingTrack) {
        const track = state.tracks.find((t) => t.get("id") === currentTrack);
        player.load(track.get("source"));
        player.setUpdateTimeCallback((time) => updateTime(store, time));
    }

    // sync time
    const currentTime = state.nowPlaying.get("currentTime");
    player.seek(currentTime);

    // continue or start playback
    player.play()
        .then(() => {
            playingTrack = currentTrack;
        })
        .catch(() => {
            // TODO: error handling
        });
};

export default (store) => (next) => (action) => {
    const result = next(action);
    if (action.meta && action.meta.player) {
        update(store);
    }
    return result;
};
