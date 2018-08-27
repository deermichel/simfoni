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

// store.subscribe(() => {
//     console.log(store.getState().nowPlaying.toJS());
// });

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
