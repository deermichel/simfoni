import React from "react";
import PropTypes from "prop-types";
import {
    Disc,
    List,
    Settings,
    User,
} from "react-feather";
import styles from "./style.scss";
import MenuItem from "./components/MenuItem";

const propTypes = {
    show: PropTypes.bool,
};
const defaultProps = {
    show: true,
};

// later: make resizable?

const Menu = ({ show }) => (
    <div className={styles.menu}>
        <div className={(show) ? styles.container : styles.hidden}>

            <div className={styles.section}>
                <span className={styles.divider}>
                    Views
                </span>
                <MenuItem text="Artists" icon={<User size={18} />} />
                <MenuItem text="Albums" icon={<Disc size={18} />} />
                <MenuItem text="Songs" icon={<List size={18} />} />
                <MenuItem text="Settings" icon={<Settings size={18} />} />
            </div>

            <div className={styles.section}>
                <span className={styles.divider}>
                    Playlists
                </span>
                <MenuItem text="Me, Myself & I" />
                <MenuItem text="New Songs" />
                <MenuItem text="Often Played" />
                <MenuItem text="Christian Mix" />
                <MenuItem text="Christmas" />
                <MenuItem text="Roadtrip" />
            </div>

        </div>
    </div>
);

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
