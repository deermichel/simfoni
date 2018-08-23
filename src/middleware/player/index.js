import AudioPlayer from "./audioPlayer";
import { nowPlayingTypes, nowPlayingOperations } from "~/stores/nowPlaying";
import PlayState from "~/constants/PlayState";

const player = new AudioPlayer();
let playingTrack = null;

const updateTime = (store, time) => {
    if (store.getState().nowPlaying.get("currentTime") !== Math.trunc(time)) { // less overhead
        store.dispatch(nowPlayingOperations.updateTime(time));
    }
};

const play = (store) => {
    const state = store.getState();
    if (state.nowPlaying.get("playState") !== PlayState.PLAYING) return;
    const currentTrack = state.nowPlaying.get("currentTrack");
    if (currentTrack !== playingTrack) {
        const track = state.tracks.find((t) => t.get("id") === currentTrack);
        player.play(track.get("source"), (time) => updateTime(store, time))
            .then(() => {
                playingTrack = currentTrack;
            })
            .catch(() => {
                // TODO: error handling
            });
    }
};

export default (store) => (next) => (action) => {
    const result = next(action);

    switch (action.type) {
        case nowPlayingTypes.PLAY_QUEUE:
            play(store);
            break;
        default:
            break;
    }

    return result;
};
