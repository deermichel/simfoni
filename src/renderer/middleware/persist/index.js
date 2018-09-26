import Store from "electron-store";
import Serialize from "remotedev-serialize";
import Immutable from "immutable";

const ignoreKeys = ["router"];
const serializer = Serialize.immutable(Immutable);
const metaStore = new Store({ name: "_persist" });
const stores = {};

export default (store) => (next) => (action) => {
    if (action.meta && action.meta.persist && action.meta.persist.ignore) {
        return next(action);
    }

    const previousState = store.getState();
    const result = next(action);
    const currentState = store.getState();

    const keys = Object.keys(currentState);
    keys.filter((key) => !ignoreKeys.includes(key))
        .filter((key) => currentState[key] !== previousState[key])
        .forEach((key) => {
            if (!stores[key]) {
                stores[key] = new Store({ name: key });

                const persistedKeys = metaStore.get("keys", []);
                if (!persistedKeys.includes(key)) {
                    metaStore.set("keys", persistedKeys.concat(key));
                }
            }

            stores[key].set("state", serializer.stringify(currentState[key]));
        });

    return result;
};

export const getPersistedState = () => {
    const keys = metaStore.get("keys", []);
    const state = {};

    keys.forEach((key) => {
        const store = new Store({ name: key });
        if (store.has("state")) {
            state[key] = serializer.parse(store.get("state"));
        }
    });

    return state;
};
