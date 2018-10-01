import React from "react";
import styles from "./style.scss";

const VinylBackground = ({ imageUrl = "", isPlaying }) => (
    <div className={styles.container}>
        <img
            className={styles.image}
            style={{ animationPlayState: (isPlaying) ? null : "paused" }}
            src={imageUrl}
        />
        {imageUrl && <div className={styles.cutout} />}
    </div>
);

export default VinylBackground;
