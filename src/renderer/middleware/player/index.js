import { Map } from "immutable";
import AudioPlayer from "./audioPlayer";
import { nowPlayingOperations } from "~/stores/nowPlaying";
import { librarySelectors } from "~/stores/library";
import PlayState from "~/constants/PlayState";

let player = null;

const updateTime = (store, time) => {
    if (store.getState().nowPlaying.get("currentTime") !== Math.trunc(time)) { // less overhead
        store.dispatch(nowPlayingOperations.updateTime(time));
    }
};

const ended = (store) => store.dispatch(nowPlayingOperations.skipForward());

const update = (currentState, previousState = { nowPlaying: Map() }) => {
    // stopped?
    const playState = currentState.nowPlaying.get("playState");
    if (playState === PlayState.STOPPED) {
        player.pause();
        return;
    }

    // sync muted
    const muted = currentState.nowPlaying.get("muted");
    if (muted !== previousState.nowPlaying.get("muted")) {
        player.setMuted(muted);
    }

    // sync volume
    const volume = currentState.nowPlaying.get("volume");
    if (volume !== previousState.nowPlaying.get("volume")) {
        player.setVolume(volume);
    }

    // sync track
    const currentTrack = currentState.nowPlaying.get("currentTrack");
    let playRequested = false;
    if (currentTrack !== previousState.nowPlaying.get("currentTrack")) {
        const tracks = librarySelectors.getTracks(currentState);
        const track = tracks.find((t) => t.id === currentTrack);
        player.load(track.uri);
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

    // init: update player (to persisted state)
    if (store) {
        update(store.getState());
    }

    // main middleware
    return (next) => (action) => {
        if (!action.meta || !action.meta.player) {
            return next(action);
        }

        const previousState = store.getState();
        const result = next(action);
        const currentState = store.getState();

        update(currentState, previousState);

        return result;
    };
};
