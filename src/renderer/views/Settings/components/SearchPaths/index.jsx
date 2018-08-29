import React from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { List } from "immutable";
import { Delete, Plus } from "react-feather";
import IconButton from "~/components/IconButton";
import styles from "./style.scss";

const propTypes = {
    paths: ImmutablePropTypes.list,
};
const defaultProps = {
    paths: List(),
};

const SearchPaths = ({ paths }) => (
    <div className={styles.searchpaths}>
        <div className={styles.title}>
            Search Paths
        </div>

        <div className={styles.container}>
            <div className={styles.header}>
                Search songs in:
                <IconButton icon={<Plus size={20} />} />
            </div>
            {paths.map((path) => (
                <div className={styles.pathitem}>
                    {path}
                    <IconButton icon={<Delete size={20} />} destructive />
                </div>
            ))}
        </div>
    </div>
);

SearchPaths.propTypes = propTypes;
SearchPaths.defaultProps = defaultProps;

export default SearchPaths;
