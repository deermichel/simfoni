import React from "react";
import { fromJS } from "immutable";
import TrackList from "./components/TrackList";
import ControlsBar from "./components/ControlsBar";

const tracks = fromJS([
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
]);

const Library = () => (
    <div className="library">
        <TrackList tracks={tracks} />
        <ControlsBar />
    </div>
);

export default Library;
