import { remote, ipcRenderer as ipc } from "electron";
import Serialize from "remotedev-serialize";
import Immutable from "immutable";

const serializer = Serialize.immutable(Immutable);

export default (target) => (store) => {
    ipc.on("dispatch", (event, arg) => {
        const action = serializer.parse(arg);
        if (!action.meta) action.meta = {};
        action.meta.remote = { ignore: true };

        store.dispatch(action);
    });

    return (next) => (action) => {
        if (action.meta && action.meta.remote && action.meta.remote.ignore) {
            return next(action);
        }

        const targetWindow = remote.getGlobal(target);
        if (targetWindow) {
            targetWindow.webContents.send("dispatch", serializer.stringify(action));
        }

        return next(action);
    };
};
