import React from "react";
import SkipButton, { SkipDirection } from "./SkipButton";
import PlayButton from "./PlayButton";
import DurationBar from "./DurationBar";

const ControlsBar = () => (
    <div className="controlsBar">
        <DurationBar />
        <SkipButton direction={SkipDirection.FORWARD} />
        <PlayButton />
        <SkipButton direction={SkipDirection.BACKWARD} />
    </div>
);

export default ControlsBar;
