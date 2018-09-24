import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Switch, Route, Redirect } from "react-router";
import App from "./components/App";
import Songs from "./views/Songs";
import Settings from "./views/Settings";
import configureStore from "./stores/configureStore";
import Views from "./constants/Views";

const history = createMemoryHistory();
const store = configureStore(history);
const persistor = persistStore(store);

const app = (
    <Provider store={store}>
        <PersistGate loading="Loading..." persistor={persistor}>
            <App>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path={Views.ARTISTS} />
                        <Route path={Views.ALBUMS} />
                        <Route path={Views.SONGS} component={Songs} />
                        <Route path={Views.SETTINGS} component={Settings} />
                        <Redirect to={Views.SONGS} />
                    </Switch>
                </ConnectedRouter>
            </App>
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById("app"));

if (module.hot) {
    module.hot.accept();
}
