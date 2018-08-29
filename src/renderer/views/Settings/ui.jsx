import React from "react";
import { fromJS } from "immutable";
import styles from "./style.scss";
import SearchPaths from "./components/SearchPaths";

const propTypes = {
};
const defaultProps = {
};

const paths = fromJS([
    "/music",
    "/asd/ejeq",
    "/ejOoao/ajww",
]);

const Settings = () => (
    <div className={styles.settings}>

        <div className={styles.section}>
            <SearchPaths paths={paths} />
        </div>

    </div>
);

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
