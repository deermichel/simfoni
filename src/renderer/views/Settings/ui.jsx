import React from "react";
import { Map } from "immutable";
import styles from "./style.scss";
import SearchPaths from "./components/SearchPaths";

const Settings = ({ settings = Map(), onAddSearchPaths, onRemoveSearchPath }) => (
    <div className={styles.settings}>

        <div className={styles.section}>
            <SearchPaths
                paths={settings.get("searchPaths")}
                onAdd={onAddSearchPaths}
                onRemove={onRemoveSearchPath}
            />
        </div>

    </div>
);

export default Settings;
