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

const seek = (time) => player.seek(time);

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

    switch (action.type) {
        case nowPlayingTypes.PLAY_QUEUE:
        case nowPlayingTypes.TOGGLE_PLAYBACK:
        case nowPlayingTypes.SKIP_FORWARD:
        // case nowPlayingTypes.PLAY_TRACK:
        // case nowPlayingTypes.STOP_PLAYBACK:
            update(store);
            break;
        case nowPlayingTypes.SKIP_BACKWARD:
            seek(0); // same song
            update(store);
            break;
        case nowPlayingTypes.SEEK:
            seek(action.payload.time);
            break;
        default:
            break;
    }

    return result;
};
