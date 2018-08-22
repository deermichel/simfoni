import { connect } from "react-redux";
import Library from "./ui";
import {
    nowPlayingOperations,
    nowPlayingSelectors,
} from "~/stores/nowPlaying";

const mapStateToProps = (state) => ({
    tracks: state.tracks,
    nowPlaying: nowPlayingSelectors.getNowPlayingWithTrack(state),
});

const mapDispatchToProps = (dispatch) => ({
    onPlayTrack: (trackId) => dispatch(nowPlayingOperations.playQueue([trackId])),
});

const LibraryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Library);

export default LibraryContainer;
