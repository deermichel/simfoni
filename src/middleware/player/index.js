import AudioPlayer from "./audioPlayer";
import { nowPlayingOperations } from "~/stores/nowPlaying";
import PlayState from "~/constants/PlayState";

let player = null;

const updateTime = (store, time) => {
    if (store.getState().nowPlaying.get("currentTime") !== Math.trunc(time)) { // less overhead
        store.dispatch(nowPlayingOperations.updateTime(time));
    }
};

const ended = (store) => store.dispatch(nowPlayingOperations.skipForward());

const update = (previousState, currentState) => {
    // stopped?
    const playState = currentState.nowPlaying.get("playState");
    if (playState === PlayState.STOPPED) {
        player.pause();
        return;
    }

    // sync track
    const currentTrack = currentState.nowPlaying.get("currentTrack");
    let playRequested = false;
    if (currentTrack !== previousState.nowPlaying.get("currentTrack")) {
        const track = currentState.tracks.find((t) => t.get("id") === currentTrack);
        player.load(track.get("source"));
        playRequested = true;
    }

    // sync time
    const currentTime = currentState.nowPlaying.get("currentTime");
    if (currentTime !== previousState.nowPlaying.get("currentTime")) {
        player.seek(currentTime);
    }

    // sync state
    if (playState !== previousState.nowPlaying.get("playState") || playRequested) {
        if (playState !== PlayState.PLAYING) {
            player.pause();
        } else {
            player.play()
                .catch(() => {
                    // TODO: error handling
                });
        }
    }
};

export default (audioPlayer = new AudioPlayer()) => (store) => {
    // init: setup callbacks
    player = audioPlayer;
    player.setUpdateTimeCallback((time) => updateTime(store, time));
    player.setEndedCallback(() => ended(store));

    // main middleware
    return (next) => (action) => {
        if (!action.meta || !action.meta.player) {
            return next(action);
        }

        const previousState = store.getState();
        const result = next(action);
        const currentState = store.getState();

        update(previousState, currentState);

        return result;
    };
};
