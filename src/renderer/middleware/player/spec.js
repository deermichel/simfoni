import { expect } from "chai";
import sinon from "sinon";
import { createStore, applyMiddleware } from "redux";
import playerMiddleware from "./index";
import AudioPlayer from "./audioPlayer";
import rootReducer from "~/stores/rootReducer";
import nowPlayingActions from "~/stores/nowPlaying/actions";

describe("player middleware", () => {
    const track = {
        title: "We Dance (orig. by Bethel Music)",
        artist: "Aileen Haude",
        album: "Covers",
        duration: 309,
        uri: "wedance.mp3",
    };

    it("sets the update time callback", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        fakePlayer.setUpdateTimeCallback = sinon.stub();
        playerMiddleware(fakePlayer)();

        expect(fakePlayer.setUpdateTimeCallback.calledOnce).to.equal(true);
    });

    it("sets the ended callback", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        fakePlayer.setEndedCallback = sinon.stub();
        playerMiddleware(fakePlayer)();

        expect(fakePlayer.setEndedCallback.calledOnce).to.equal(true);
    });

    it("calls next(action) if not invoked", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        const middleware = playerMiddleware(fakePlayer)();
        const next = sinon.stub().returns("result");
        const action = {};
        const result = middleware(next)(action);

        expect(next.calledOnce).to.equal(true);
        expect(result).to.equal("result");
    });

    it("calls next(action) if invoked", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        const store = createStore(rootReducer);
        const middleware = playerMiddleware(fakePlayer)(store);
        const next = sinon.stub().returns("result");
        const action = { meta: { player: true } };
        const result = middleware(next)(action);

        expect(next.calledOnce).to.equal(true);
        expect(result).to.equal("result");
    });

    it("invokes player.pause() if playback stopped", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        fakePlayer.pause = sinon.stub();

        const store = createStore(rootReducer, applyMiddleware(
            playerMiddleware(fakePlayer),
        ));
        const action = nowPlayingActions.stopPlayback();
        store.dispatch(action);

        expect(fakePlayer.pause.calledTwice).to.equal(true); // one for init (stop), one for action
    });

    it("invokes player.load() and player.play() if playback started", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        fakePlayer.load = sinon.stub();
        fakePlayer.play = sinon.stub().returns({ catch: () => 0 });

        const store = createStore(rootReducer, applyMiddleware(
            playerMiddleware(fakePlayer),
        ));
        store.dispatch({
            type: "ADD_TRACKS",
            payload: { tracks: [track] },
        });
        const action = nowPlayingActions.playTrack(0);
        store.dispatch(action);

        expect(fakePlayer.load).to.have.been.calledOnceWith("wedance.mp3");
        expect(fakePlayer.play.calledOnce).to.equal(true);
    });

    it("invokes player.pause() if playback paused", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        fakePlayer.pause = sinon.stub();

        const store = createStore(rootReducer, applyMiddleware(
            playerMiddleware(fakePlayer),
        ));
        store.dispatch({
            type: "ADD_TRACKS",
            payload: { tracks: [track] },
        });
        store.dispatch({
            type: "PLAY_TRACK",
            payload: { track: 0 },
        });
        const action = nowPlayingActions.togglePlayback();
        store.dispatch(action);

        expect(fakePlayer.pause.calledTwice).to.equal(true); // one for init (stop), one for action
    });

    it("invokes player.mute() if muted", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        fakePlayer.setMuted = sinon.stub();

        const store = createStore(rootReducer, applyMiddleware(
            playerMiddleware(fakePlayer),
        ));
        store.dispatch({
            type: "ADD_TRACKS",
            payload: { tracks: [track] },
        });
        store.dispatch({
            type: "PLAY_TRACK",
            payload: { track: 0 },
        });
        const action = nowPlayingActions.toggleMute();
        store.dispatch(action);

        expect(fakePlayer.setMuted).to.be.calledOnceWith(true);
    });

    it("invokes player.setVolume() if volume changed", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        fakePlayer.setVolume = sinon.stub();

        const store = createStore(rootReducer, applyMiddleware(
            playerMiddleware(fakePlayer),
        ));
        store.dispatch({
            type: "ADD_TRACKS",
            payload: { tracks: [track] },
        });
        store.dispatch({
            type: "PLAY_TRACK",
            payload: { track: 0 },
        });
        const action = nowPlayingActions.setVolume(0.5);
        store.dispatch(action);

        expect(fakePlayer.setVolume).to.be.calledOnceWith(0.5);
    });

    it("invokes player.seek() if seeked", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        fakePlayer.seek = sinon.stub();

        const store = createStore(rootReducer, applyMiddleware(
            playerMiddleware(fakePlayer),
        ));
        store.dispatch({
            type: "ADD_TRACKS",
            payload: { tracks: [track] },
        });
        store.dispatch({
            type: "PLAY_TRACK",
            payload: { track: 0 },
        });
        const action = nowPlayingActions.seek(23);
        store.dispatch(action);

        expect(fakePlayer.seek).to.have.been.calledOnceWith(23);
    });

    it("dispatches updateTime action on time change callback", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        const store = createStore(rootReducer);
        store.dispatch = sinon.stub();
        fakePlayer.setUpdateTimeCallback = sinon.stub();
        playerMiddleware(fakePlayer)(store);

        const updateTime = fakePlayer.setUpdateTimeCallback.getCall(0).args[0];
        updateTime(42);

        expect(store.dispatch).to.have.been.calledOnceWith(
            nowPlayingActions.updateTime(42),
        );
    });

    it("dispatches skipForward action on track ended callback", () => {
        const fakePlayer = sinon.createStubInstance(AudioPlayer);
        const store = createStore(rootReducer);
        store.dispatch = sinon.stub();
        fakePlayer.setEndedCallback = sinon.stub();
        playerMiddleware(fakePlayer)(store);

        const ended = fakePlayer.setEndedCallback.getCall(0).args[0];
        ended();

        expect(store.dispatch).to.have.been.calledOnceWith(
            nowPlayingActions.skipForward(),
        );
    });
});
