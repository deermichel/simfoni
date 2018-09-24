import React from "react";
import styles from "./style.scss";
import Library from "./components/Library";

const Settings = ({ onImportFolders }) => (
    <div className={styles.settings}>

        <div className={styles.section}>
            <Library onImport={onImportFolders} />
        </div>

    </div>
);

export default Settings;
