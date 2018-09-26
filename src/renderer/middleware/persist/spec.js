import { expect } from "chai";
import sinon from "sinon";
import { createStore, applyMiddleware } from "redux";
import persistMiddleware, { getPersistedState } from "./index";
import rootReducer from "~/stores/rootReducer";

let sharedState = {};
class DummyPersistor {
    constructor({ name }) {
        this.name = name;
        if (!sharedState[name]) {
            sharedState[name] = {};
        }
    }

    set(key, value) {
        sharedState[this.name][key] = value;
    }

    get(key, defaultValue) {
        return sharedState[this.name][key] || defaultValue;
    }

    has(key) {
        return !!sharedState[this.name][key];
    }
}
const getPersistor = (config) => new DummyPersistor(config);

describe("persist middleware", () => {
    beforeEach(() => {
        sharedState = {};
    });

    it("calls next(action) if not invoked", () => {
        const middleware = persistMiddleware(getPersistor)();
        const next = sinon.stub().returns("result");
        const action = { meta: { persist: { ignore: true } } };
        const result = middleware(next)(action);

        expect(next.calledOnce).to.equal(true);
        expect(result).to.equal("result");
    });

    it("calls next(action) if invoked", () => {
        const store = createStore(rootReducer);
        const middleware = persistMiddleware(getPersistor)(store);
        const next = sinon.stub().returns("result");
        const action = {};
        const result = middleware(next)(action);

        expect(next.calledOnce).to.equal(true);
        expect(result).to.equal("result");
    });

    it("persists changes of state", () => {
        const middleware = persistMiddleware(getPersistor);
        const store = createStore(rootReducer, applyMiddleware(middleware));

        let persistedState = getPersistedState(getPersistor);
        expect(persistedState).to.deep.equal({});

        store.dispatch({ type: "TOGGLE_MUTE" });
        persistedState = getPersistedState(getPersistor);
        expect(persistedState.nowPlaying.get("muted")).to.equal(true);

        store.dispatch({ type: "TOGGLE_MUTE" });
        persistedState = getPersistedState(getPersistor);
        expect(persistedState.nowPlaying.get("muted")).to.equal(false);
    });
});
