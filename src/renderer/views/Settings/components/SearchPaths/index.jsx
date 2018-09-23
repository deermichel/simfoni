import React from "react";
import { remote } from "electron";
import { Set } from "immutable";
import { Delete, Plus } from "react-feather";
import IconButton, { ButtonSize } from "~/components/IconButton";
import styles from "./style.scss";

const addPathsDialog = (onAdd) => {
    const newPaths = remote.dialog.showOpenDialog({
        title: "Add search paths",
        properties: ["openDirectory", "multiSelections"],
    });
    if (newPaths) {
        onAdd(newPaths);
    }
};

const SearchPaths = ({ paths = Set(), onAdd, onRemove }) => (
    <div className={styles.searchpaths}>
        <div className={styles.title}>
            Search Paths
        </div>

        <div className={styles.container}>
            <div className={styles.header}>
                Search songs in:
                <IconButton
                    icon={Plus}
                    size={ButtonSize.SMALL}
                    onClick={() => addPathsDialog(onAdd)}
                />
            </div>

            {paths.map((path) => (
                <div className={styles.pathitem} key={path}>
                    {path}
                    <IconButton
                        icon={Delete}
                        size={ButtonSize.SMALL}
                        destructive
                        onClick={() => onRemove(path)}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default SearchPaths;
