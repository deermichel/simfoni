import React from "react";
import PropTypes from "prop-types";
import styles from "./style.scss";

const propTypes = {
    currentTime: PropTypes.number,
    totalTime: PropTypes.number,
    onSeek: PropTypes.func,
};
const defaultProps = {
    currentTime: 0,
    totalTime: 0,
    onSeek: () => 0,
};

const formatDuration = (duration) => `${Math.trunc(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`;
const generateStyle = (currentTime, totalTime) => {
    const progress = (totalTime === 0) ? 0 : 100.0 * currentTime / totalTime;
    return {
        background: `linear-gradient(to right, salmon ${progress}%, lightgrey ${progress}%)`,
    };
};

const seek = (e, totalTime, onSeek) => {
    const relativePos = e.clientX - e.target.getBoundingClientRect().left;
    const { width } = e.target.getBoundingClientRect();
    onSeek(Math.floor(totalTime * relativePos / width));
};

const DurationBar = ({ currentTime, totalTime, onSeek }) => (
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

DurationBar.propTypes = propTypes;
DurationBar.defaultProps = defaultProps;

export default DurationBar;
