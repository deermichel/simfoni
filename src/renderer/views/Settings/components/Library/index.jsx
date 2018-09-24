import React from "react";
import { remote } from "electron";
import { Plus } from "react-feather";
import styles from "./style.scss";
import TextButton from "~/components/TextButton";

const importDialog = (onImport) => {
    const folders = remote.dialog.showOpenDialog({
        title: "Import from",
        properties: ["openDirectory", "multiSelections"],
    });
    if (folders) {
        onImport(folders);
    }
};

const Library = ({ onImport }) => (
    <div className={styles.library}>
        <div className={styles.title}>
            Library
        </div>
        <TextButton text="Import from" icon={Plus} onClick={() => importDialog(onImport)} />
    </div>
);

export default Library;
