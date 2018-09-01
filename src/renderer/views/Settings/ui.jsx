import React from "react";
import PropTypes from "prop-types";
import { Map } from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";
import styles from "./style.scss";
import SearchPaths from "./components/SearchPaths";

const propTypes = {
    settings: ImmutablePropTypes.map,
    onAddSearchPaths: PropTypes.func,
    onRemoveSearchPath: PropTypes.func,
};
const defaultProps = {
    settings: Map(),
    onAddSearchPaths: () => 0,
    onRemoveSearchPath: () => 0,
};

const Settings = ({ settings, onAddSearchPaths, onRemoveSearchPath }) => (
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

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
