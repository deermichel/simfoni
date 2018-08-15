import React from "react";
import { Clock } from "react-feather";
import styles from "./style.scss";

const Header = () => (
    <div className={styles.header}>
        <span className={styles.title}>
            Title
        </span>
        <span className={styles.artist}>
            Artist
        </span>
        <span className={styles.album}>
            Album
        </span>
        <span className={styles.duration}>
            <Clock size={16} />
        </span>
    </div>
);

export default Header;
