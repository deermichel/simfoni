import { expect } from "chai";
import { fromJS } from "immutable";
import actions from "./actions";
import selectors from "./selectors";
import reducer from "./reducers";
import PlayState from "~/constants/PlayState";

describe("nowPlaying reducer", () => {
    it("has an initial state", () => {
        const nextState = reducer(undefined, {});

        expect(nextState).to.equal(fromJS({
            playState: PlayState.STOPPED,
            history: [],
            queue: [],
            muted: false,
            volume: 1.0,
        }));
    });

    it("handles PLAY_QUEUE without history", () => {
        const initialState = fromJS({
            playState: PlayState.PAUSED,
            history: ["id4"],
            queue: ["id4"],
        });
        const action = actions.playQueue(["id1", "id2", "id3"]);
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id1",
            currentTime: 0,
            playState: PlayState.PLAYING,
            queue: ["id2", "id3"],
            history: ["id1", "id4"],
        }));
    });

    it("handles PLAY_QUEUE with history", () => {
        const initialState = fromJS({
            playState: PlayState.PAUSED,
            history: ["id4"],
            queue: ["id4"],
        });
        const action = actions.playQueue(["id1", "id2", "id3"], ["id8", "id9"]);
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id1",
            currentTime: 0,
            playState: PlayState.PLAYING,
            queue: ["id2", "id3"],
            history: ["id1", "id8", "id9"],
        }));
    });

    it("handles TOGGLE_PLAYBACK", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 142,
            playState: PlayState.PLAYING,
            queue: ["id2", "id3"],
            history: ["id1"],
        });
        const action = actions.togglePlayback();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id1",
            currentTime: 142,
            playState: PlayState.PAUSED,
            queue: ["id2", "id3"],
            history: ["id1"],
        }));
    });

    it("handles SKIP_FORWARD", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 142,
            playState: PlayState.PLAYING,
            queue: ["id2", "id3"],
            history: ["id1"],
        });
        const action = actions.skipForward();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id2",
            currentTime: 0,
            playState: PlayState.PLAYING,
            queue: ["id3"],
            history: ["id2", "id1"],
        }));
    });

    it("handles SKIP_FORWARD when paused", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 142,
            playState: PlayState.PAUSED,
            queue: ["id2", "id3"],
            history: ["id1"],
        });
        const action = actions.skipForward();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id2",
            currentTime: 0,
            playState: PlayState.PAUSED,
            queue: ["id3"],
            history: ["id2", "id1"],
        }));
    });

    it("handles SKIP_FORWARD on empty queue", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 142,
            playState: PlayState.PLAYING,
            queue: [],
            history: ["id1", "id2"],
        });
        const action = actions.skipForward();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            playState: PlayState.STOPPED,
            queue: [],
            history: ["id1", "id2"],
        }));
    });

    it("handles SKIP_BACKWARD (time >= 0:03 -> to beginning of track)", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 3,
            playState: PlayState.PLAYING,
            queue: ["id2", "id3"],
            history: ["id1"],
        });
        const action = actions.skipBackward();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id1",
            currentTime: 0,
            playState: PlayState.PLAYING,
            queue: ["id2", "id3"],
            history: ["id1"],
        }));
    });

    it("handles SKIP_BACKWARD (time >= 0:03 -> to beginning of track) when paused", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 3,
            playState: PlayState.PAUSED,
            queue: ["id2", "id3"],
            history: ["id1"],
        });
        const action = actions.skipBackward();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id1",
            currentTime: 0,
            playState: PlayState.PAUSED,
            queue: ["id2", "id3"],
            history: ["id1"],
        }));
    });

    it("handles SKIP_BACKWARD (time < 0:03 -> to previous track)", () => {
        const initialState = fromJS({
            currentTrack: "id2",
            currentTime: 2,
            playState: PlayState.PLAYING,
            queue: ["id3"],
            history: ["id2", "id1"],
        });
        const action = actions.skipBackward();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id1",
            currentTime: 0,
            playState: PlayState.PLAYING,
            queue: ["id2", "id3"],
            history: ["id1"],
        }));
    });

    it("handles SKIP_BACKWARD (time < 0:03 -> to previous track) on empty history", () => {
        const initialState = fromJS({
            currentTrack: "id2",
            currentTime: 2,
            playState: PlayState.PAUSED,
            queue: ["id3"],
            history: ["id2"],
        });
        const action = actions.skipBackward();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            playState: PlayState.STOPPED,
            queue: ["id2", "id3"],
            history: [],
        }));
    });

    it("handles PLAY_TRACK", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 32,
            playState: PlayState.PAUSED,
            queue: ["id4", "id3"],
            history: ["id1"],
        });
        const action = actions.playTrack("id2");
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id2",
            currentTime: 0,
            playState: PlayState.PLAYING,
            queue: ["id4", "id3"],
            history: ["id2", "id1"],
        }));
    });

    it("handles SEEK", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 32,
            playState: PlayState.PAUSED,
            queue: ["id4", "id3"],
            history: ["id1"],
        });
        const action = actions.seek(45);
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id1",
            currentTime: 45,
            playState: PlayState.PAUSED,
            queue: ["id4", "id3"],
            history: ["id1"],
        }));
    });

    it("handles STOP_PLAYBACK", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 32,
            playState: PlayState.PAUSED,
            queue: ["id4", "id3"],
            history: ["id1"],
        });
        const action = actions.stopPlayback();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            playState: PlayState.STOPPED,
            queue: ["id4", "id3"],
            history: ["id1"],
        }));
    });

    it("handles UPDATE_TIME", () => {
        const initialState = fromJS({
            currentTrack: "id1",
            currentTime: 32,
            playState: PlayState.PLAYING,
            queue: ["id4", "id3"],
            history: ["id1"],
        });
        const action = actions.updateTime(33.6);
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            currentTrack: "id1",
            currentTime: 33,
            playState: PlayState.PLAYING,
            queue: ["id4", "id3"],
            history: ["id1"],
        }));
    });

    it("handles TOGGLE_MUTE", () => {
        const initialState = fromJS({
            volume: 0.7,
            muted: false,
            playState: PlayState.PLAYING,
        });
        const action = actions.toggleMute();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            volume: 0.7,
            muted: true,
            playState: PlayState.PLAYING,
        }));
    });

    it("handles SET_VOLUME", () => {
        const initialState = fromJS({
            volume: 0.3,
            muted: true,
            playState: PlayState.PLAYING,
        });
        const action = actions.setVolume(0.8);
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            volume: 0.8,
            muted: false,
            playState: PlayState.PLAYING,
        }));
    });
});

describe("nowPlaying selectors", () => {
    describe("getNowPlayingWithTrack", () => {
        it("returns nowPlaying with full track object", () => {
            const state = {
                tracks: fromJS([{
                    id: "sail",
                    title: "Sail",
                    artist: "AWOLNATION",
                    album: "Megalithic Symphony",
                    duration: 259,
                }]),
                nowPlaying: fromJS({
                    currentTrack: "sail",
                    currentTime: 142,
                    state: PlayState.PAUSED,
                    history: ["sail", "id1", "id2"],
                    queue: ["id3", "id4"],
                }),
            };
            const selected = selectors.getNowPlayingWithTrack(state);

            expect(selected).to.equal(fromJS({
                currentTrack: {
                    id: "sail",
                    title: "Sail",
                    artist: "AWOLNATION",
                    album: "Megalithic Symphony",
                    duration: 259,
                },
                currentTime: 142,
                state: PlayState.PAUSED,
                history: ["sail", "id1", "id2"],
                queue: ["id3", "id4"],
            }));
        });
    });
});
