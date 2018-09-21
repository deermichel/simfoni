import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Map, List } from "immutable";
import {
    List as VList,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
} from "react-virtualized";
import Clickable from "~/components/Clickable";
import Track from "./components/Track";
import Header from "./components/Header";
import styles from "./style.scss";

const propTypes = {
    tracks: ImmutablePropTypes.list,
    icons: ImmutablePropTypes.map,
    onClickTrack: PropTypes.func,
};
const defaultProps = {
    tracks: List(),
    icons: Map(),
    onClickTrack: () => 0,
};

const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 34,
});

const TrackItem = ({ index, style, parent, tracks, icons, onClickTrack }) => { // eslint-disable-line
    const track = tracks.get(index);
    return (track) ? (
        <CellMeasurer
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
        >
            <div className={(index % 2) ? styles.oddtrackitem : styles.trackitem} style={style}>
                <Clickable onClick={() => onClickTrack(track.get("id"))}>
                    <Track track={track} icon={icons.get(track.get("id"))} />
                </Clickable>
            </div>
        </CellMeasurer>
    ) : null;
};

const TrackList = ({ tracks, icons, onClickTrack }) => (
    <div className={styles.tracklist}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.listcontainer}>
            <AutoSizer>
                {({ height, width }) => (
                    <VList
                        deferredMeasurementCache={cache}
                        className={styles.tracks}
                        height={height || 100}
                        rowCount={tracks.size}
                        rowHeight={cache.rowHeight}
                        rowRenderer={(rowProps) => (
                            <TrackItem
                                tracks={tracks}
                                icons={icons}
                                onClickTrack={onClickTrack}
                                {...rowProps}
                            />
                        )}
                        style={{ overflowY: "overlay" }}
                        width={width || 100}
                    />
                )}
            </AutoSizer>
        </div>
    </div>
);

TrackList.propTypes = propTypes;
TrackList.defaultProps = defaultProps;

export default TrackList;
