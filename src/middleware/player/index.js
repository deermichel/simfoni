import AudioPlayer from "./audioPlayer";

const player = new AudioPlayer();
let playingTrack = null;

const updateTime = () => {
};

export default (store) => (next) => (action) => {
    const result = next(action);
    if (!action.meta || !action.meta.player) {
        return result;
    }

    const state = store.getState();
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

    return result;
};
