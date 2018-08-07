import React from "react";
import SkipButton, { SkipDirection } from "./SkipButton";
import PlayButton from "./PlayButton";
import DurationBar from "./DurationBar";

const propTypes = {};
const defaultProps = {};

const ControlsBar = () => (
    <div className="controlsBar">
        <DurationBar />
        <SkipButton direction={SkipDirection.FORWARD} />
        <PlayButton />
        <SkipButton direction={SkipDirection.BACKWARD} />
    </div>
);

ControlsBar.propTypes = propTypes;
ControlsBar.defaultProps = defaultProps;

export default ControlsBar;
