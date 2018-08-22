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
        }));
    });

    it("handles PLAY_QUEUE", () => {
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
});

xdescribe("nowPlaying selectors", () => {
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
                    trackId: "sail",
                    currentTime: 142,
                    state: PlayState.PAUSED,
                }),
            };
            const selected = selectors.getNowPlayingWithTrack(state);

            expect(selected).to.equal(fromJS({
                track: {
                    id: "sail",
                    title: "Sail",
                    artist: "AWOLNATION",
                    album: "Megalithic Symphony",
                    duration: 259,
                },
                currentTime: 142,
                state: PlayState.PAUSED,
            }));
        });
    });
});
