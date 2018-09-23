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
import { libraryOperations } from "./stores/library";
import Views from "./constants/Views";

const history = createMemoryHistory();
const store = configureStore(history);

// load settings
store.dispatch(settingsOperations.loadSearchPaths());

[
    {
        title: "Believa",
        artist: "Raelee Nikole",
        album: "Answers",
        duration: 243, // 4:03
        uri: "_mp3/Believa.mp3",
    },
    {
        title: "Pumped Up Kicks",
        artist: "Foster The People",
        album: "Torches",
        duration: 240, // 4:00
        uri: "_mp3/Pumped Up Kicks.mp3",
    },
    {
        title: "No Diggity",
        artist: "Chet Faker",
        album: "Digging the Blogosphere",
        duration: 226, // 3:46
        uri: "_mp3/No Diggity.mp3",
    },
    {
        title: "Born Without Borders (Unplugged)",
        artist: "The New Schematics",
        album: "The New Schematics (Unplugged+)",
        duration: 263, // 4:23
        uri: "_mp3/Born Without Borders (Unplugged).mp3",
    },
    {
        title: "It Was You",
        artist: "Norah Jones",
        album: "It Was You",
        duration: 331, // 5:31
        uri: "_mp3/It Was You.mp3",
    },
].forEach((track) => store.dispatch(libraryOperations.addTrack(track)));

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
