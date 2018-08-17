import React from "react";
import SkipButton, { SkipDirection } from "./SkipButton";
import PlayButton from "./PlayButton";
import DurationBar from "./DurationBar";
import styles from "./style.scss";

const ControlsBar = () => (
    <div className={styles.controlsbar}>
        <DurationBar />
        <div className={styles.buttons}>
            <SkipButton direction={SkipDirection.BACKWARD} />
            <PlayButton />
            <SkipButton direction={SkipDirection.FORWARD} />
        </div>
    </div>
);

export default ControlsBar;
