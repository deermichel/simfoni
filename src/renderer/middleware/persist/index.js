import Store from "electron-store";
import Serialize from "remotedev-serialize";
import Immutable from "immutable";

const defaultPersistor = (config) => new Store(config);
const ignoreKeys = ["router"];
const serializer = Serialize.immutable(Immutable);

export default (getPersistor = defaultPersistor) => (store) => {
    const metaStore = getPersistor({ name: "_persist" });
    const stores = {};

    return (next) => (action) => {
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
                    stores[key] = getPersistor({ name: key });

                    const persistedKeys = metaStore.get("keys", []);
                    if (!persistedKeys.includes(key)) {
                        metaStore.set("keys", persistedKeys.concat(key));
                    }
                }

                stores[key].set("state", serializer.stringify(currentState[key]));
            });

        return result;
    };
};

export const getPersistedState = (getPersistor = defaultPersistor) => {
    const metaStore = getPersistor({ name: "_persist" });
    const keys = metaStore.get("keys", []);
    const state = {};

    keys.forEach((key) => {
        const store = getPersistor({ name: key });
        if (store.has("state")) {
            state[key] = serializer.parse(store.get("state"));
        }
    });

    return state;
};
