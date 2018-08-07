import React from "react";
import TrackList from "./components/TrackList";
import ControlsBar from "./components/ControlsBar";

const Library = () => (
    <div className="library">
        <TrackList />
        <ControlsBar />
    </div>
);

export default Library;
