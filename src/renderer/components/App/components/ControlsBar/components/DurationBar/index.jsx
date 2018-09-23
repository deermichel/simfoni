import React from "react";
import styles from "./style.scss";

const formatDuration = (duration) => `${Math.trunc(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`;
const generateStyle = (currentTime, totalTime) => {
    const progress = (totalTime === 0) ? 0 : 100.0 * currentTime / totalTime;
    return {
        background: `linear-gradient(to right, __COLOR_SECONDARY_DARK ${progress}%,`
            + `__COLOR_SECONDARY_LIGHT ${progress}%)`,
    };
};

const seek = (e, totalTime, onSeek) => {
    const relativePos = e.clientX - e.target.getBoundingClientRect().left;
    const { width } = e.target.getBoundingClientRect();
    onSeek(Math.floor(totalTime * relativePos / width));
};

const DurationBar = ({ currentTime = 0, totalTime = 0, onSeek }) => (
    <div
        className={styles.durationbar}
        style={generateStyle(currentTime, totalTime)}
        onClick={(e) => seek(e, totalTime, onSeek)}
    >
        <div className={styles.details}>
            <span className={styles.currenttime}>
                {formatDuration(currentTime)}
            </span>
            <span className={styles.totaltime}>
                {formatDuration(totalTime)}
            </span>
        </div>
    </div>
);

export default DurationBar;
