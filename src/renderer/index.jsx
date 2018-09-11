import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router";
import App from "./components/App";
import Songs from "./views/Songs";
import Settings from "./views/Settings";
import configureStore from "./stores/configureStore";
import { settingsOperations } from "./stores/settings";
import Views from "./constants/Views";

const history = createMemoryHistory();
const store = configureStore(history);

// load settings
store.dispatch(settingsOperations.loadSearchPaths());

const app = (
    <Provider store={store}>
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
    </Provider>
);

ReactDOM.render(app, document.getElementById("app"));

if (module.hot) {
    module.hot.accept();
}
