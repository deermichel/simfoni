import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import Library from "./scenes/Library";
import configureStore from "./stores/configureStore";
import { tracksOperations } from "./stores/tracks";

const store = configureStore();
store.dispatch(tracksOperations.setTracks([
    {
        id: "a",
        title: "Believa",
        artist: "Raelee Nikole",
        album: "Answers",
        duration: 243, // 4:03
    },
    {
        id: "b",
        title: "Pumped Up Kicks",
        artist: "Foster The People",
        album: "Torches",
        duration: 240, // 4:00
    },
    {
        id: "c",
        title: "No Diggity",
        artist: "Chet Faker",
        album: "Digging the Blogosphere",
        duration: 226, // 3:46
    },
]));

const app = (
    <Provider store={store}>
        <App>
            <Library />
        </App>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}
