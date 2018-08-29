import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router";
import App from "./components/App";
import Library from "./views/Library";
import Settings from "./views/Settings";
import configureStore from "./stores/configureStore";
import { tracksOperations } from "./stores/tracks";
import Views from "./constants/Views";

const history = createMemoryHistory();
const store = configureStore(history);
store.dispatch(tracksOperations.setTracks([
    {
        id: "believa",
        title: "Believa",
        artist: "Raelee Nikole",
        album: "Answers",
        duration: 243, // 4:03
        source: "_mp3/Believa.mp3",
    },
    {
        id: "pumped",
        title: "Pumped Up Kicks",
        artist: "Foster The People",
        album: "Torches",
        duration: 240, // 4:00
        source: "_mp3/Pumped Up Kicks.mp3",
    },
    {
        id: "no",
        title: "No Diggity",
        artist: "Chet Faker",
        album: "Digging the Blogosphere",
        duration: 226, // 3:46
        source: "_mp3/No Diggity.mp3",
    },
    {
        id: "born",
        title: "Born Without Borders (Unplugged)",
        artist: "The New Schematics",
        album: "The New Schematics (Unplugged+)",
        duration: 263, // 4:23
        source: "_mp3/Born Without Borders (Unplugged).mp3",
    },
    {
        id: "it",
        title: "It Was You",
        artist: "Norah Jones",
        album: "It Was You",
        duration: 331, // 5:31
        source: "_mp3/It Was You.mp3",
    },
]));

const app = (
    <Provider store={store}>
        <App>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path={Views.ARTISTS} />
                    <Route path={Views.ALBUMS} />
                    <Route path={Views.SONGS} component={Library} />
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
