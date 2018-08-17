import React from "react";
import styles from "./style.scss";

const DurationBar = () => (
    <div className={styles.durationbar}>
        <div className={styles.details}>
            <span className={styles.currenttime}>
                2:12
            </span>
            <span className={styles.totaltime}>
                3:28
            </span>
        </div>
    </div>
);

export default DurationBar;
