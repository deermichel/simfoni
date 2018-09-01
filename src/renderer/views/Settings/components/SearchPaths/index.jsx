import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { List } from "immutable";
import { Delete, Plus } from "react-feather";
import IconButton, { ButtonSize } from "~/components/IconButton";
import styles from "./style.scss";

const propTypes = {
    paths: ImmutablePropTypes.list,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
};
const defaultProps = {
    paths: List(),
    onAdd: () => 0,
    onDelete: () => 0,
};

const SearchPaths = ({ paths, onAdd, onDelete }) => (
    <div className={styles.searchpaths}>
        <div className={styles.title}>
            Search Paths
        </div>

        <div className={styles.container}>
            <div className={styles.header}>
                Search songs in:
                <IconButton icon={Plus} size={ButtonSize.SMALL} onClick={onAdd} />
            </div>

            {paths.map((path) => (
                <div className={styles.pathitem}>
                    {path}
                    <IconButton
                        icon={Delete}
                        size={ButtonSize.SMALL}
                        destructive
                        onClick={() => onDelete(path)}
                    />
                </div>
            ))}
        </div>
    </div>
);

SearchPaths.propTypes = propTypes;
SearchPaths.defaultProps = defaultProps;

export default SearchPaths;
