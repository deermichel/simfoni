import React from "react";
import styles from "./style.scss";

const Track = ({ track = {}, icon }) => {
    const { duration } = track;
    const formattedDuration = `${Math.trunc(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`;

    return (
        <div className={styles.track}>
            <span className={styles.icon}>
                {icon}
            </span>
            <span className={styles.title}>
                {track.title}
            </span>
            <span className={styles.artist}>
                {track.artist}
            </span>
            <span className={styles.album}>
                {track.album}
            </span>
            <span className={styles.duration}>
                {duration && formattedDuration}
            </span>
        </div>
    );
};

export default Track;
